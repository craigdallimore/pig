App.module('View', function(View, App, Backbone, Marionette, $, _) {

  View.MediaListView = Marionette.CompositeView.extend({

    appendHtml: function(collectionView, itemView, index){

      var childrenContainer = $(collectionView.el).find('ul');

      var children = childrenContainer.children();
      if (children.size() + 1 === index) {
        childrenContainer.append(itemView.el);
      } else {
        childrenContainer.children().eq(index).before(itemView.el);
      }

    },

    itemViewContainer: 'ul'

  });

});