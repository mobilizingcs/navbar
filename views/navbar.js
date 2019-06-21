define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'vent',
  'oh',
  'kc',
  'config',
  'text!templates/navbar.html',
  'text!templates/accountdetails.html',
  'text!templates/changepassword.html',
  'text!templates/message.html'
], function($, _, Backbone, bootstrap, vent, oh, kc, config, navbarTemplate, accountDetailsTemplate, changePasswordTemplate, messageTemplate){
  var navbarView = Backbone.View.extend({
    el: $("#navbar"),
    initialize: function(){
      var template = _.template(navbarTemplate);
      this.$el.html(template({navs: config.navs.models, title: config.title, icon: config.icon, wiki: config.tools.findWhere({"title":"Wiki"}), contact: config.contact}));
      document.title = config.title;

      oh.user.whoami().done(function(username){
        vent.trigger('ohmage:success:auth', username);
      }).error(function(){
        // on error, let's first assume that the keycloak token didn't make it to a cookie yet.
        if (kc.authenticated) {
          vent.trigger('ohmage:keycloak:token:active');
        }
      });

      vent.on('ohmage:success:auth', this.logged_in, this);
      vent.on('ohmage:error:auth', this.logged_out);
      vent.on('ohmage:keycloak:token:expired', this.refreshKeycloakToken);
      vent.on('ohmage:keycloak:token:active', this.activeKeycloakToken);
    },
    events: {
      "click .navbar-link": "navbarLink",
      "click #logoutlink": "logout",
      "click #change-password-modal-link": "changePasswordModal",
      "submit #change-password-form": "changePassword"
    },
    navbarLink: function(e){
      var link = $(e.currentTarget).attr("href")
      vent.trigger("route:navlink", link)
      vent.trigger("ohmage:success:auth")
    },
    logout: function(){
      oh.logout().done(function(){
        $.removeCookie('auth_token');
        vent.trigger('ohmage:error:auth');
        vent.trigger('route', '');
      });
      kc.logout({redirectUri: location.origin});
      $.removeCookie("KEYCLOAK_TOKEN");
    },
    logged_out: function(){
      $("#username-li").hide();
      $("#logoutlink").hide();
      $("#login-li").show();      
    },
    logged_in: function(){
      var that = this;
      $("#login-li").hide();
      $("#username-li").show();
      $("#logoutlink").show();
      oh.user.whoami().done(function(username){
        $("#nav-username").text(username);
        oh.user.read({user_list : username}).done(function(r){
          var user_details = r[username];
          user_details['permissions']['admin'] ? $("#admin-link").show() : $("#admin-link").hide();
          user_details['permissions']['can_create_classes'] ? $("#admin-link2").show() : $("#admin-link2").hide();
		  user_details['permissions']['can_create_classes'] ? $("#admin-link3").show() : $("#admin-link3").hide();
		  user_details['permissions']['can_create_classes'] ? $("#admin-link7").attr("href", "#shiny?admin=true") : $("#admin-link7").attr("href", "#shiny");
          that.accountDetailsModal(username, user_details);
        });
      })
    },
    accountDetailsModal: function(username, details){
      var template = _.template(accountDetailsTemplate);
      $("#navbar").append(template({username: username, user:details}));
    },
    changePasswordModal: function(){
      var template = _.template(changePasswordTemplate);
      $("#navbar").append(template({username: $("#nav-username").text()}));
      $("#change-password-form").validate({
        rules: {
          "change_password_new_password": {
            required: true,
            minlength: 8
          },
          "change_password_new_password_confirm": {
            required: true,
            minlength: 8,
            equalTo: "#change_password_new_password"
          }
        }
      })
    },
    changePassword: function(e){
      e.preventDefault();
      var that = this;
      if (!$('#change-password-form').valid()) {
          return false;
      }
      oh.user.change_password({
        user: $("#change-password-username").val(),
        password: $("#change-password-current-password").val(),
        new_password: $("#change_password_new_password").val()
      }).done(function(){
        $("#change-password-current-password").val('');
        $("#change_password_new_password").val('');
        $("#change_password_new_password_confirm").val('');
        that.changePasswordMessage("Successfully changed password", 'success')
      }).error(function(msg){
        that.changePasswordMessage(msg, 'danger')
      });
    },
    changePasswordMessage: function(msg, status){
      var target = '.errordiv.change'; 
      var template = _.template(messageTemplate);
      $(target).html(template({status: status, msg: msg})).fadeIn(100);
    },
    refreshKeycloakToken: function(){
      //requests to update the token
      console.log("attempting to refresh the keycloak token...");
      kc.updateToken(5).success(function(){
        $.cookie("KEYCLOAK_TOKEN", kc.token);
        console.log("refresh successful.")
        vent.trigger('ohmage:success:auth');
      }).error(function() {
        kc.clearToken();
        $.removeCookie("KEYCLOAK_TOKEN");
        vent.trigger('ohmage:error:auth');
      });
    },
    activeKeycloakToken: function(){
      console.log("an active token has been found!");
      $.cookie("KEYCLOAK_TOKEN", kc.token);
      vent.trigger('ohmage:success:auth');
    }
  });

  return navbarView;
});
