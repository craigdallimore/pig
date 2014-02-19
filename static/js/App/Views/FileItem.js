define([ 'marionette', 'App/Views/Confirm' ], function(Marionette, ConfirmView) {

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
      this.model.bind('upload:error',    this.onError, this);

    },

    onProgress: function(model, val) {

      this.$progressEl.width(val + '%');

    },

    onComplete: function(model, val) {

      this.$progressEl.width(0);

    },

    onError: function(response) {

      var $p = this.$el.find('p'),
        $btnRetry = $('<button title="' + response  + '" class="btn-retry">Retry?</button>');

      $p.text(this.model.get('name') + ' [error!]');
      this.$progressEl.width(0);

      $btnRetry.insertAfter($p);

      $btnRetry.on('click', _.bind(this.retry, this));

    },

    onRemove: function() {

      this.model.trigger('remove');
      this.remove();

    },

    onRemoveClick: function(e) {

      e.preventDefault();

      var msg    = 'Are you sure you want to remove ' + this.model.get('name') + '?',
        callback = _.bind(this.onRemove, this);

      var confirmView = new ConfirmView({
        msg:      msg,
        callback: callback
      });

    },

    retry: function() {

      this.$el.find('.btn-retry').off().remove();
      this.model.upload();

    },

    swapNameForInput: function(e) {

      $(e.target).hide();

      var $input = this.$el.find('input');

      $input.show().focus();

      // Select up to the last dot
      $input[0].selectionEnd = $input[0].value.lastIndexOf('.');

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
