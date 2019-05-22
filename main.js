require.config({
  paths: {
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.1/backbone-min',
    bootstrap: "//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min",
    'jquery.cookie': '//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie',
    ohmage: 'lib/ohmage',
    text: 'lib/text',
    async: 'lib/async',
    keycloak: 'lib/keycloak',
    'jquery.validate': '//cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.14.0/jquery.validate.min'//,
    //'recaptchav1': "https://www.google.com/recaptcha/api/js/recaptcha_ajax"
  },
  shim: {
  	bootstrap: {
  		deps: ['jquery']
  	},
  	'jquery.cookie': {
  		deps: ['jquery']
  	},
  	'ohmage': {
  		deps: ['jquery', 'jquery.cookie']
  	},
    'jquery.validate': {
      deps: ['jquery']
    },
    'keycloak': {
      deps: ['jquery.cookie']
    }
  }
});

require([
  'kc',
  'app'
], function(kc, App){
  App.initialize();
});
