App.module('Collection', function(Collection, App, Backbone, Marionette, $, _) {

  Collection.Video = Backbone.Collection.extend({

    url: function() {
      return '/api/item/video';
    }

  });

});

