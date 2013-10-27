App.module('Model', function(Model, App, Backbone, Marionette, $, _) {

  Model.VideoFileItem = Backbone.Model.extend({

    initialize: function() {

      _.extend(this, Backbone.Events);
      this.on('remove', this.onRemove, this);
H
    },

    url: function() {
      return '/api/item/video/' + this.get('name');
    },

    onRemove: function() {

      var jqXHR = $.ajax({
        url: this.url(),
        type: 'DELETE'
      });

      jqXHR.done(_.bind(this.destroy, this));

      jqXHR.error(function(errArgs) {
        console.log('error', errArgs);
      });
    }

  });

});

