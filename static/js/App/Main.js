define([

  'underscore',
  'socketio',
  'App/Views/Uploader',
  'App/Collection/File',
  'App/Views/MediaList',
  'App/Views/Filter'

  ], function( _, io, UploaderView, FileCollection, MediaListView, FilterView ) {

  var socket = io.connect(location.href),

    filterView          = new FilterView({ el: '#filter' }),
    uploaderView        = new UploaderView({ el: '#upload' }),
    imageCollection     = new FileCollection({ url: '/api/item/image' }),
    audioCollection     = new FileCollection({ url: '/api/item/audio' }),
    videoCollection     = new FileCollection({ url: '/api/item/video' }),
    audioCollectionView = new MediaListView({ el: '#audio-list', collection: audioCollection }),
    imageCollectionView = new MediaListView({ el: '#image-list', collection: imageCollection }),
    videoCollectionView = new MediaListView({ el: '#video-list', collection: videoCollection }),

    addVideo = _.bind(videoCollection.add, videoCollection),
    addAudio = _.bind(audioCollection.add, audioCollection),
    addImage = _.bind(imageCollection.add, imageCollection),

    filterVideo = _.bind(videoCollectionView.filter, videoCollectionView),
    filterImage = _.bind(imageCollectionView.filter, imageCollectionView),
    filterAudio = _.bind(audioCollectionView.filter, audioCollectionView);

  // Binding
  // --------------------------------------------------------------------------

  socket.on('list:video', addVideo);
  socket.on('list:audio', addAudio);
  socket.on('list:image', addImage);

  filterView.bind('change', filterVideo);
  filterView.bind('change', filterAudio);
  filterView.bind('change', filterImage);

  uploaderView.bind('upload:start', function(file) {

    switch (file.type) {

      case 'video': addVideo(file, { at: 0 }); break;
      case 'audio': addAudio(file, { at: 0 }); break;
      case 'image': addImage(file, { at: 0 }); break;

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

