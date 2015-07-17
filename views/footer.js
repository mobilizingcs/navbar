define([
  'jquery',
  'underscore',
  'backbone',
  'config',
  'text!templates/footer.html'
], function($, _, Backbone, config, footerTemplate){
  var footerView = Backbone.View.extend({
    el: $("#footer"),
    initialize: function(){
      var template = _.template(footerTemplate);
      this.$el.html(template({ footer: config.footer }));
    }
  });
  return footerView;
});