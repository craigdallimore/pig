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

    onAsynchStart: function() {
      this.$el.find('.ajax').fadeIn();
    },

    onAsynchDone: function() {
      this.$el.find('.ajax').stop().fadeOut();
      this.$progressEl.width(0);
    },

    fileSelectHandler: function(e) {

      var event  = e.originalEvent ? e.originalEvent : e,
        files    = event.target.files || event.dataTransfer.files,
        formData = new FormData();

      event.preventDefault();

      if (!files) return;


      _.each(files, function(file) {
        formData.append(file.name, file);
      });

      var xhr = new XMLHttpRequest();

      xhr.onreadystatechange = _.bind(this.onReadyStateChange, this);
      xhr.upload.onerror     = _.bind(this.onError, this);
      xhr.upload.onprogress  = _.bind(this.onProgress, this);

      xhr.open('POST', '/uploads');
      xhr.send(formData);
      this.onAsynchStart();
    },

    onError: function(msg) {
      this.$el.find('.ajax').stop().fadeOut();
      this.$progressEl.width(0);
      console.log('error', msg);
    },

    onProgress: function(e) {

      if (e.lengthComputable) {
        var percentage = Math.floor((e.loaded / e.total) * 100);
        this.$progressEl.width(percentage + '%');
      }

    },

    onReadyStateChange: function(e) {
      var xhr = e.target;

      if (xhr.readyState === 4) {
        this.onAsynchDone();
      }

    }

  });

});

