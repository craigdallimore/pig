App.on('start', function() {

  var uploader      = new App.View.Uploader({ el: '#upload' }),
    imageCollection = new App.Collection.Image(),
    audioCollection = new App.Collection.Audio(),
    videoCollection = new App.Collection.Video();

  var imageCollectionView = new App.View.MediaListView({
    el:         '#image-list',
    collection: imageCollection,
    itemView:   App.View.ImageFileItem
  });

  var videoCollectionView = new App.View.MediaListView({
    el:         '#video-list',
    collection: videoCollection,
    itemView:   App.View.VideoFileItem,
    model:      App.Model.VideoFileItem
  });



  imageCollection.fetch();
  videoCollection.fetch();

});





App.start();
