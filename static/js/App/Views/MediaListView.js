App.module('View', function(View, App, Backbone, Marionette, $, _) {

  View.MediaListView = Marionette.CompositeView.extend({

    itemViewContainer: 'ul',

    initialize: function() {},

    events: {
      'click .btn-refresh': 'onButtonClick'
    },

    onButtonClick: function() {
      var view = this;
      this.$el.find('.ajax').fadeIn();
      this.collection.fetch({
        success: view.onUpdated()
      });
    },

    onUpdated: function() {
      this.$el.find('.ajax').fadeOut();
    }

  });

});

