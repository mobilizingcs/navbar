define([
  'jquery',
  'underscore',
  'backbone',
  'vent',
  'oh',
  'lib/text!templates/message.html'
], function($, _, Backbone, vent, oh, messageTemplate){
  //a quasi view to keep activation out of the router
  var activationView = Backbone.View.extend({
    el: $("#webtools"),
    initialize: function(id){
      oh.user.activate({
        registration_id: id
      }).done(function(){
        vent.trigger('ohmage:success:activation', 'Successfully activated your account. <a href="#login">Log in now!</a>', 'success')
      });
      vent.on('ohmage:error', this.message, this)
      vent.on('ohmage:success:activation', this.message, this)
    },
    message: function(msg, status){
      var template = _.template(messageTemplate);
      this.$el.find('.errordiv').html(template({status: status, msg: msg})).fadeIn(100);
    },
  });
  return activationView;
});