App.module('Model', function(Model, App, Backbone, Marionette, $, _) {

  Model.VideoFileItem = Backbone.Model.extend({

    initialize: function() {
      console.log('init model', this);
      _.extend(this, Backbone.Events);

      this.on('remove', this.onRemove, this);
H
    },

    url: function() {
      return '/api/item/video';
    },

    onRemove: function() {
      console.log('on destroy');
    }

  });

});

