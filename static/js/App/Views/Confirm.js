// Confirm dialog view
// ----------------------------------------------------------------------------

define([ 'marionette' ], function() {

  return Marionette.ItemView.extend({

    template: '#tmpl-confirm',

    className: 'mask',

    events: {

      'click .btn-ok':     'ok',
      'click .btn-cancel': 'cancel',
      'click':             'cancel'

    },

    initialize: function(options) {

      this.callback = options.callback;
      this.msg      = options.msg;
      this.render();

    },

    ok: function(callback) {

      this.callback();
      this.remove();

    },

    cancel: function(e) {

      var $target = $(e.target),
        remove = _.bind(this.remove, this);

      if ( $target.hasClass('mask') || $target.hasClass('btn-cancel') ) {

        this.$el.find('.dialog').addClass('zoomout');
        _.delay(remove, 300);

      }

    },

    render: function() {

      var template = Marionette.TemplateCache.get(this.template),
          html     = template({ msg: this.msg }),
          $el = this.$el;

      this.$el
        .html(html)
        .appendTo('body');


      _.defer(function() {
        $el.find('.zoomout').removeClass('zoomout');
      });

      return this;

    }

  });

});
