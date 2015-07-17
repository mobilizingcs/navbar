define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'vent',
  'oh',
  'config',
  'text!templates/navbar.html',
  'text!templates/accountdetails.html'
], function($, _, Backbone, bootstrap, vent, oh, config, navbarTemplate, accountDetailsTemplate){
  var navbarView = Backbone.View.extend({
    el: $("#navbar"),
    initialize: function(){
      var template = _.template(navbarTemplate);
      this.$el.html(template({navs: config.navs.models, icon: config.icon, wiki: config.tools.findWhere({"title":"Wiki"}), contact: config.contact}));
      vent.on('ohmage:success:auth', this.logged_in, this);
      vent.on('ohmage:error:auth', this.logged_out);
    },
    events: {
      "click #logoutlink": "logout"
    },
    logout: function(){
      oh.logout().done(function(){
        $.removeCookie('auth_token');
        vent.trigger('ohmage:error:auth');
        vent.trigger('route', '');
      });
    },
    logged_out: function(){
      $("#username-li").hide();
      $("#logoutlink").hide();
      $("#login-li").show();      
    },
    logged_in: function(){
      var that = this;
      $("#login-li").hide();
      $("#username-li").show()
      $("#logoutlink").show();
      oh.user.whoami().done(function(username){
        $("#nav-username").text(username);
        oh.user.read({user_list : username}).done(function(r){
          var user_details = r[username];
          user_details['permissions']['admin'] ? $("#admin-link").show() : $("#admin-link").hide();
          that.accountDetails(username, user_details);
        });
      })
    },
    accountDetails: function(username, details){
      var template = _.template(accountDetailsTemplate);
      $("#navbar").append(template({username: username, user:details}));
    }
  });

  return navbarView;
});