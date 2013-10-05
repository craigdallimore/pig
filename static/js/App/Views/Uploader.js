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

    },

    toggleDroppable: function() {
      this.$el.find('#btn-submit').hide();
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
      console.log('asynch start');
      this.$el.find('.ajax').fadeIn();
    },

    onAsynchDone: function() {
      console.log('asynch end');
      this.$el.find('.ajax').stop().fadeOut();
    },

    fileSelectHandler: function(e) {

      var event = e.originalEvent ? e.originalEvent : e,
        files   = event.target.files || event.dataTransfer.files,
        formData = new FormData();

      event.preventDefault();

      if (!files) return;


      _.each(files, function(file) {
        console.log('file', file);
        formData.append(file.name, file);
      });

      var xhr = new XMLHttpRequest();

      xhr.open('POST', '/uploads');
      xhr.send(formData);
      xhr.onreadystatechange = _.bind(this.onReadyStateChange, this);

      console.log(xhr);
      this.onAsynchStart();
    },

    onReadyStateChange: function(e) {
      var xhr = e.target;

      if (xhr.readyState === 4) {
        console.log('all done');
        this.onAsynchDone();
      }

    }

  });

});

