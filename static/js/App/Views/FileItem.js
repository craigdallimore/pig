define([ 'marionette' ], function(Marionette) {

  return Marionette.ItemView.extend({

    tagName: 'li',

    events: {

      'click .btn-remove': 'onRemoveClick',
      'click .name':       'swapNameForInput',
      'blur input':        'changeName',
      'keyup input':       'onKeyUp'

    },

    initialize: function() {

      this.model.bind('change:progress', this.onProgress, this);
      this.model.bind('change:uploaded', this.onComplete, this);
      this.model.bind('change:path',     this.render, this);
      this.model.bind('change:name',     this.render, this);

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

    swapNameForInput: function(e) {

      $(e.target).hide();
      this.$el.find('input').show().focus();

    },

    swapInputForName: function() {

      this.$el.find('.name').show();
      this.$el.find('input').hide();

    },

    onKeyUp: function(e) {

      if(e.keyCode === 13) {
        this.changeName();
      }

    },

    changeName: function() {

      this.model.set('newName', this.$el.find('input').val());
      this.swapInputForName();

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
