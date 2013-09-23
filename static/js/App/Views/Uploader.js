App.module('View', function(View, App, Backbone, Marionette, $, _) {

  View.Uploader = Backbone.View.extend({

    initialize: function() {

      if (window.File && window.FileList && window.FileReader) {
        this.toggleDroppable();
      }

    },

    toggleDroppable: function() {
      this.$el.find('#btn-submit').hide();
    }

  });

});

