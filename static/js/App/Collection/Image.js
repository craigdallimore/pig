App.module('Collection', function(Collection, App, Backbone, Marionette, $, _) {

  Collection.Image = Backbone.Collection.extend({

    url: function() {
      return '/api/item/image';
    }

  });

});
