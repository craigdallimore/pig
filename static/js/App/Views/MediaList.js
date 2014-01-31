define([ 'marionette', 'App/Views/FileItem' ], function(Marionette, FileItemView) {

  return Marionette.CompositeView.extend({

    itemView: FileItemView,

    appendHtml: function(collectionView, itemView, index){

      var childrenContainer = $(collectionView.el).find('ul');
      var children = childrenContainer.children();

      if (!children.size())  {
        childrenContainer.append(itemView.el);
      } else {
        childrenContainer.children().eq(0).before(itemView.el);
      }

    },

    itemViewContainer: 'ul'

  });

});
