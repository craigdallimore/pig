App.module('Collection', function(Collection, App, Backbone, Marionette, $, _) {

  Collection.Video = Backbone.Collection.extend({

    initialize: function() {},

    url: function() {
      return '/api/item/video';
    },

    model: App.Model.VideoFileItem

  });

});

