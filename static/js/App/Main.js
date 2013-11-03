App.on('start', function() {

  var socket = io.connect(location.href);


  var uploader      = new App.View.Uploader({ el: '#upload' }),
    imageCollection = new App.Collection.File({ url: '/api/item/image' }),
    audioCollection = new App.Collection.File({ url: '/api/item/audio' }),
    videoCollection = new App.Collection.File({ url: '/api/item/video' }),

    audioCollectionView = new App.View.MediaListView({
      el:         '#audio-list',
      collection: audioCollection,
      itemView:   App.View.FileItem
    }),

    imageCollectionView = new App.View.MediaListView({
      el:         '#image-list',
      collection: imageCollection,
      itemView:   App.View.FileItem
    }),

    videoCollectionView = new App.View.MediaListView({
      el:         '#video-list',
      collection: videoCollection,
      itemView:   App.View.FileItem
    }),

    addVideo = _.bind(videoCollection.add, videoCollection),
    addAudio = _.bind(audioCollection.add, audioCollection),
    addImage = _.bind(imageCollection.add, imageCollection);

  socket.on('list:video',       addVideo);
  socket.on('list:audio',       addAudio);
  socket.on('list:image',       addImage);

  uploader.bind('upload:start', function(file) {
    switch (file.type) {
      case 'video': addVideo(file); break;
      case 'audio': addAudio(file); break;
      case 'image': addImage(file); break;
    }
  });

  socket.on('file:saved', function(file) {
    switch (file.type) {
      case 'video':
        videoCollection.findWhere({ name: file.name }).set(file);
        break;
      case 'audio':
        audioCollection.findWhere({ name: file.name }).set(file);
        break;
      case 'image':
        imageCollection.findWhere({ name: file.name }).set(file);
        break;
    }
  });

});




App.start();