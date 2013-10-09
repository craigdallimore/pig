App.module('View', function(View, App, Backbone, Marionette, $, _) {

  View.ImageFileItem = Marionette.ItemView.extend({

    tagName: 'li',

    template: function(serialized_model) {
      return App.Tmpl['static/templates/image'](serialized_model);
    }

  });

  View.VideoFileItem = Marionette.ItemView.extend({

    tagName: 'li',

    template: function(serialized_model) {
      return App.Tmpl['static/templates/video'](serialized_model);
    }

  });

});
