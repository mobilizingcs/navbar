define([
  'jquery',
  'underscore',
  'backbone',
  'jquery.validate',
  'vent',
  'oh',
  'config/ohmage',
  'lib/text!templates/recover.html'
], function($, _, Backbone, validate, vent, oh, ohmage, recoverTemplate){
  var recoverView = Backbone.View.extend({
    el: $("#login"),
    initialize: function(){
      vent.trigger('snuff:login')
      vent.trigger('snuff:register')
      var template = _.template(recoverTemplate);
      this.$el.html(template({foo: 'bar'}));

      $("#recover-form").validate();
      $("#recover-username").focus();
      vent.on('recover:success', this.submitted);
      vent.on('snuff:recover', this.undelegate, this)
    },
    events: {
      'submit form': 'recover'
    },
    recover: function(e){
      e.preventDefault();
      if (!$('#recover-form').valid()) {
        return false;
      }
      oh.user.reset_password({
        username: $("#recover-username").val(),
        email_address: $("#recover-email").val()
      }).done(function(){
        vent.trigger("recover:success")
      });
    },
    submitted: function(){
      $("#recover-form").hide();
      $(".errordiv").fadeIn(100).children().addClass('alert-success').text('Thanks! Please check your e-mail for your temporary password.');
    },
    undelegate: function(){
      this.undelegateEvents();
    }
  });
  return recoverView;
});