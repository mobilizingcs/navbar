define([
  'jquery',
  'underscore',
  'backbone',
  'config/ohmage',
  'lib/text!templates/footer.html'
], function($, _, Backbone, ohmage, footerTemplate){
  var footerView = Backbone.View.extend({
    el: $("#footer"),
    initialize: function(){
      var template = _.template(footerTemplate);
      this.$el.html(template({ footer: ohmage.footer }));
    }
  });
  return footerView;
});