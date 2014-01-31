// Configure app loading
// ----------------------------------------------------------------------------

require.config({

  //baseUrl: '../js/',

  paths: {

    underscore: 'libs/underscore-min',
    socketio:   'libs/socket.io.min',
    backbone:   'libs/backbone-min',
    marionette: 'libs/backbone.marionette.min',
    jquery:     'libs/jquery-2.0.3.min',

  },

  shim: {

    'underscore': { exports: '_' },
    'jquery':     { exports: '$' },
    'backbone':   { deps: ['underscore', 'jquery'], exports: 'Backbone' },
    'marionette': { deps: [ 'backbone' ], exports: 'Marionette' },
    'socketio':   { exports: 'io' }

  }

});

require([ 'App/Main' ]);
