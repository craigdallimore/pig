App.module('View', function(View, App, Backbone, Marionette, $, _) {

  View.FileItem = Marionette.ItemView.extend({

    tagName: 'li',

    events: {
      'click .btn-remove': 'onRemoveClick'
    },

    initialize: function() {

      this.model.bind('change:progress', this.onProgress, this);
      this.model.bind('change:uploaded', this.onComplete, this);
      this.model.bind('change:path',     this.render, this);

    },

    onProgress: function(model, val) {
      this.$progressEl.width(val + '%');
    },

    onComplete: function(model, val) {
      this.$progressEl.width(0);
    },

    onRemoveClick: function(e) {
      e.preventDefault();
      this.model.trigger('remove');
      this.remove();
    },

    template: function(serialized_model) {
      return App.Tmpl['static/templates/' + this.model.get('type') ](serialized_model);
    },

    render: function() {

      this.$el.html(this.template(this.model.attributes));
      this.$progressEl = this.$el.find('.progress');

      return this;

    }

  });

});
