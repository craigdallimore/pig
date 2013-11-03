App.module('View', function(View, App, Backbone, Marionette, $, _) {

  View.Uploader = Backbone.View.extend({

    events: {
      'change    #file-select': 'fileSelectHandler',
      'drop      #file-drag':   'onDrop',
      'dragover  #file-drag':   'onDragover',
      'dragout   #file-drag':   'onDragout'
    },

    initialize: function() {

      if (window.File && window.FileList && window.FileReader) {
        this.toggleDroppable();
      }

      this.$progressEl = this.$el.find('.progress');

    },

    toggleDroppable: function() {
      this.$el.find('#btn-submit, #file-select, label[for="file-select"]').hide();
      this.$el.find('#file-drag').show();
    },

    onDragover: function(e) {
      e.preventDefault();
      this.$el.find('#file-drag').addClass('hover');
    },

    onDragout: function() {
      this.$el.find('#file-drag').removeClass('hover');
    },

    onDrop: function(e) {
      this.$el.find('#file-drag').removeClass('hover');
      this.fileSelectHandler(e);
    },

    fileSelectHandler: function(e) {

      var event = e.originalEvent ? e.originalEvent : e,
        files   = event.target.files || event.dataTransfer.files,
        uploader = this;

      event.preventDefault();

      if (!files) return;

      _.each(files, function(file) {
        uploader.trigger('upload:start', {
          name:     file.name,
          size:     file.size,
          type:     file.type.split('/')[0],
          file:     file
        });
      });

    },


  });

});