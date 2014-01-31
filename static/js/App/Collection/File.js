define([ 'backbone', 'App/Models/FileItem' ], function(Backbone, FileItem) {

  return Backbone.Collection.extend({

    model: FileItem

  });

});
