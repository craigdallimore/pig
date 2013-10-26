App.module('View', function(View, App, Backbone, Marionette, $, _) {

  View.ImageFileItem = Marionette.ItemView.extend({

    tagName: 'li',

    template: function(serialized_model) {
      return App.Tmpl['static/templates/image'](serialized_model);
    }

  });

  View.VideoFileItem = Marionette.ItemView.extend({

    tagName: 'li',

    events: {
      'click .btn-remove': 'onRemoveClick'
    },

    onRemoveClick: function(e) {
      e.preventDefault();
      console.log('remove', this.model);
      this.model.trigger('remove');
    },

    template: function(serialized_model) {
      return App.Tmpl['static/templates/video'](serialized_model);
    }

  });

});
