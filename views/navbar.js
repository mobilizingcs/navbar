define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'vent',
  'oh',
  'config/2015flow',
  'lib/text!templates/navbar.html',
  'lib/text!templates/accountdetails.html'
], function($, _, Backbone, bootstrap, vent, oh, ohmage, navbarTemplate, accountDetailsTemplate){
  var navbarView = Backbone.View.extend({
    el: $("#navbar"),
    initialize: function(){
      var template = _.template(navbarTemplate);
      this.$el.html(template({navs: ohmage.navs.models, icon: ohmage.icon, wiki: ohmage.tools.findWhere({"title":"Wiki"}), contact: ohmage.contact}));
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
    logged_in: function(username){
      var that = this;
      $("#login-li").hide();
      $("#username-li").show()
      $("#nav-username").text(username);
      $("#logoutlink").show();
      oh.user.read({user_list : username}).done(function(r){
        var user_details = r[username];
        user_details['permissions']['admin'] ? $("#admin-link").show() : $("#admin-link").hide();
        that.accountDetails(username, user_details);
        //$("#user-modal-firstname").text(r[name]["first_name"] || "unknown");
        //$("#user-modal-lastname").text(r[name]["last_name"] || "unknown");
        //$("#user-modal-org").text(r[name]["organization"] || "unknown");
        //$("#user-modal-email").text(r[name]["email_address"] || "unknown");
      });
    },
    accountDetails: function(username, details){
      var template = _.template(accountDetailsTemplate);
      $("#navbar").append(template({username: username, user:details}));
    }
  });

  return navbarView;
});