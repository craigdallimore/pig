App.module('Collection', function(Collection, App, Backbone, Marionette, $, _) {

  Collection.Audio = Backbone.Collection.extend({

    url: function() {
      return '/api/item/audio';
    }

  });

});

