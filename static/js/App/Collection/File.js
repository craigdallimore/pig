App.module('Collection', function(Collection, App, Backbone, Marionette, $, _) {

  Collection.File = Backbone.Collection.extend({

    model: App.Model.FileItem

  });

});