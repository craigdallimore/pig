define([ 'marionette' ], function(Marionette) {

  return Marionette.ItemView.extend({

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

    filter: function(term) {

      var name = this.model.get('name').toLowerCase(),
        match  = (term.length === 0 || name.indexOf(term.toLowerCase()) > -1 );

      this.$el[ match ? 'show' : 'hide' ]();

    },

    render: function() {

      var template = Marionette.TemplateCache.get('#tmpl-' + this.model.get('type'));

      this.$el.html(template(this.model.attributes));
      this.$progressEl = this.$el.find('.progress');

      return this;

    }

  });

});
