define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.validate',
  'vent',
  'oh',
  'config/ohmage',
  'lib/text!templates/register.html',
  'recaptchav1',
  'lib/async!//www.google.com/recaptcha/api.js?render=explicit!onload'
], function($, _, Backbone, validate, vent, oh, ohmage, registerTemplate){
  var registerView = Backbone.View.extend({
    el: $("#login"),
    initialize: function(){      
      vent.trigger('snuff:login')
      vent.trigger('snuff:recover')
      var that = this;
      oh.registration.read().done(function(data){
        that.key = data.recaptcha_public_key;
        var template = _.template(registerTemplate);
        that.$el.html(template({tos: data.terms_of_service}));
        oh.config.read().done(function(data){
          if (data.application_version >= '2.17') {
            that.rv = 2;
            that.recaptchav2(that.key);
          } else {
            that.rv = 1;
            that.recaptchav1(that.key);
          }
          registerFormValidator = $("#register-form").validate(that.validateOptions());
        });
      });
      $("#register_username").focus();
      vent.on('register:success', this.submitted);
      vent.on('snuff:register', this.undelegate, this)
      vent.on('ohmage:error', this.errordiv);
    },
    events: {
      'submit form': 'register'
    },
    recaptchav1: function(key){
      Recaptcha.focus_response_field = function(){return false;};
      Recaptcha.create(key,
        "recaptcha", {
        lang: "en",
        callback: Recaptcha.focus_response_field
      });     
    },
    recaptchav2: function(key){

      grecaptcha.render('recaptcha', {
       'sitekey' : key
      }); 
    },
    register: function(e){
      e.preventDefault();
      if (!$('#register-form').valid()) {
        return false;
      }
      if (this.rv == 2) {
        oh.user.register({
          username: $("#register_username").val(),
          password: $("#register_password").val(),
          email_address: $("#register_email").val(),
          recaptcha_version: "2.0",
          recaptcha_response_field: $("#g-recaptcha-response").val()
        }).done(function(){
          vent.trigger('register:success')
        });
      } else if (this.rv == 1) {
        oh.user.register({
          username: $("#register_username").val(),
          password: $("#register_password").val(),
          email_address: $("#register_email").val(),
          recaptcha_challenge_field: $("#recaptcha_challenge_field").val(),
          recaptcha_response_field: $("#recaptcha_response_field").val()
        }).done(function(){
          vent.trigger('register:success')
        });
      }
    },
    errordiv: function(msg){
      $(".errordiv").fadeIn(100)
        .children().addClass('alert-danger').removeClass('alert-success')
        .find('span').text(msg);
      $('html, body').animate({
        scrollTop: $("#register-panel").offset().top
      });
    },
    submitted: function(){
      $("#register-form").hide();
      $(".errordiv").fadeIn(100)
        .children().addClass('alert-success').removeClass('alert-danger')
        .find('span').text('Thanks for registering! Check your email for an activation link!');
    },
    undelegate: function(){
      this.undelegateEvents();
    },
    validateOptions: function(){
      $.validator.addMethod("ohmageUser", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_\.@\+-]+$/i.test(value);
      }, "Username can only contain alphanumeric as well as the characters: _ . + - @");
      return {
        ignore: ".ignore",
        rules: {  
          "register_username": {
            required: true,
            minlength: 4,
            maxlength: 25,
            ohmageUser: true
          },
          "register_password": {
            required: true,
            minlength: 8
          },
          "register_password_confirm": {
            required: true,
            minlength: 8,
            equalTo: "#register_password"
          },
          "register_email": {
            required: true,
            email: true
          },
          "register_tos_agree": "required",
          "g-recaptcha-response": "required",
          "recaptcha_response_field": "required"
        },
        messages: {
          register_tos_agree: "You must agree to our terms of service."
        },
        showErrors: function(errorMap, errorList) {
          if (registerFormValidator.numberOfInvalids() == 0 ) {
            //$(".errordiv").empty();
          } else {
            //message("This form has errors! See below.");
          }
          this.defaultShowErrors();
        },
        errorClass: "has-error",
        validClass: "has-success",
        errorPlacement: function(error, element) {
          if (element.attr("name") == "register_tos_agree") {
            error.insertAfter("#tos-agree-error");
          } else if (element.attr("name") == "recaptcha_response_field") {
            error.insertAfter("#recaptcha_area");
          } else {
            error.insertAfter(element);
          }
        },
        highlight: function(element, errorClass, validClass) {
          $(element).parent('.form-group').removeClass(validClass).addClass(errorClass);
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).parent('.form-group').removeClass(errorClass).addClass(validClass);
        }, 
      }
    }
  });
  return registerView;
});