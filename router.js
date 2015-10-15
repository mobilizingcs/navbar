define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'views/webtools',
  'views/mobileapps',
  'views/footer',
  'views/navbar',
  'views/login',
  'views/recover',
  'views/register',
  'views/activation',
  'views/iframe'
], function($, _, Backbone, vent, webToolsView, mobileAppsView, footerView, navbarView, loginView, recoverView, registerView, activationView, iframeView){
  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'index',
      'login': 'login',
      'recover': 'recover',
      'register': 'register',
      'activate?registration_id=:id': 'index',
      '*page' : 'pages'
    },
  });

  var initialize = function(){
    var app_router = new AppRouter;

    vent.on('route:navlink', function(link){
      console.log("router: navbar link clicked, navigate there whether or not backbone thinks we are there.")
      Backbone.history.loadUrl(link)
    })

    vent.on('route', function(route){
      if (Backbone.history.getFragment() !== '') {
        app_router.navigate(route, {trigger: true});
      } else {
        console.log("router: smashed login error. on index page.");
      }
    })

    if (window.self == window.top) {
      // assume we are in an iframe if we aren't the top.
      var navbarview = new navbarView();
      navbarview.render();
    } 

    app_router.on('route:index', function(id){
      $(".display").hide();
      $("#landing").show();
      if (id) {
        var activationview = new activationView(id);
        app_router.navigate('');
      }
      var webtoolsView = new webToolsView();
      webtoolsView.render();
      var mobileappsView = new mobileAppsView();
      mobileappsView.render();
      var footer = new footerView();
      footer.render();
      vent.trigger('app:event');
    })

    app_router.on('route:login', function(){
      $(".display").hide();
      $("#login").show();
      loginview = new loginView();
      loginview.render();
    })

    app_router.on('route:recover', function(){
      $(".display").hide();
      $("#login").show();
      var recoverview = new recoverView();
      recoverview.render();
    })

    app_router.on('route:register', function(){
      $(".display").hide();
      $("#login").show();
      registerview = new registerView();
      registerview.render();
    })
  
    app_router.on('route:pages', function(page, args){
      if(args) page = page + "?" + args;
      console.log('pages route: '+page)
      $(".display").hide();
      $("#iframe").show();
      var iframeview = new iframeView();
      iframeview.render();
      vent.trigger('iframe', page)
    })
    
    Backbone.history.start();
  };

  return {
    initialize: initialize
  };
});