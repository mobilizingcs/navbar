define([
  'jquery',
  'underscore',
  'backbone',
  'oh',
  'vent',
  'text!templates/iframe.html'
], function($, _, Backbone, oh, vent, iframeTemplate){
  var iframeView = Backbone.View.extend({
    el: $("#iframe"),
    initialize: function(){
      var template = _.template( iframeTemplate);
      this.$el.html(template({foo: 'bar'}));
      var iframe = this.$el.find("#meta_iframe");
      var that = this;
      that.iframe_logging_in = false
      iframe.on('load', function(){
        //a hack to leave the iframe in iframe login. this makes it easier for the clients??
        var iframe_location = iframe[0].contentWindow.location
        if (location.hash == '#login' && !(location.href.match(/navbar\/(.*)/))){
          vent.trigger('ohmage:error:auth');
          that.iframe_logging_in = true;
        } else {
          if (that.iframe_logging_in) {
            that.iframe_logging_in = false;
            vent.trigger('ohmage:success:auth');
          }
        }
        vent.trigger('iframe:hash');
        $(this.contentWindow).on('hashchange', function(){
          vent.trigger('iframe:hash');
        })  
      });
      vent.on('iframe', this.navigate, this)
      vent.on('iframe:hash', this.hashUpdate, this)
    },
    navigate: function(src){
      console.log('iframe navigating to: '+src)
      this.$el.find('#meta_iframe').attr("src", '/navbar/' + src);
    },
    hashUpdate: function(){
      var iframe = this.$el.find('#meta_iframe');  
      var iframe_href = iframe[0].contentWindow.location;
      var location = iframe[0].contentWindow.location.href.match(/navbar\/(.*)/)
      location = '#'+location[1];
      history.pushState('', '', location);  
    }
  });
  return iframeView;
});