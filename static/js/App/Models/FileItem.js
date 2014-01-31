define([ 'backbone' ], function(Backbone) {

  return Backbone.Model.extend({

    initialize: function() {

      _.extend(this, Backbone.Events);
      this.on('remove', this.onRemove, this);

      if (! this.get('path')) {
        this.upload();
      }

    },

    url: function() {
      return '/api/item/' + this.get('type') + '/' + this.get('name');
    },

    upload: function() {

      var xhr = new XMLHttpRequest(),
          formData = new FormData();

      formData.append(this.get('name'), this.get('file'));

      xhr.onreadystatechange = _.bind(this.onReadyStateChange, this);
      xhr.upload.onprogress  = _.bind(this.onProgress, this);
      xhr.upload.onerror     = _.bind(this.onError, this);

      xhr.open('POST', '/uploads');
      xhr.send(formData);

    },

    onError: function(msg) {
      console.log('error', msg);
    },

    onProgress: function(e) {

      if (e.lengthComputable) {
        var percentage = Math.floor((e.loaded / e.total) * 100);
        this.set('progress', percentage);
      }

    },

    onReadyStateChange: function(e) {

      var xhr = e.target;

      if (xhr.readyState === 4) {
        this.set('uploaded', true);
      }

    },

    onRemove: function() {

      var jqXHR = $.ajax({
        url: this.url(),
        type: 'DELETE'
      });

      jqXHR.done(_.bind(this.onDelete, this));
      jqXHR.error(_.bind(this.onError, this));

    },

    onDelete: function() {
      this.collection.remove(this, { silent: true });
    }

  });

});
