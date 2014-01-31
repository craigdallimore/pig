define([ 'backbone' ], function(Backbone) {

  return Backbone.View.extend({

    events: { 'keyup': 'onChange' },

    initialize: function() {

      this.$el.focus();

    },

    onChange: function(e) {

      this.trigger('change', e.target.value);

    }

  });

});
