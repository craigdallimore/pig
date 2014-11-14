///////////////////////////////////////////////////////////////////////////////
//
// Main
//
//// TODO /////////////////////////////////////////////////////////////////////

//[/] Appraise gulpfile
//[/] Remove backbone etc
//[/] Add browserify
//[!] Add flux / react
//[/] Get socketio working again
//[x] Get file uploads working
//[x] Implement file rename
//[x] Implement file delete
//[x] Implement folders

//// LIBS /////////////////////////////////////////////////////////////////////

// React
var React = require('react');

//// SCENE ////////////////////////////////////////////////////////////////////

var MediaLists = require('./components/media-lists');
var Uploader   = require('./components/uploader');

var mediaLists = MediaLists({
  types : {
    video: { key : 'video-list' , name : 'Videos' , listEvent : 'list:video', children : [] },
    image: { key : 'image-list' , name : 'Images' , listEvent : 'list:image', children : [] },
    audio: { key : 'audio-list' , name : 'Audio'  , listEvent : 'list:audio', children : [] }
  }
});

var uploader = Uploader();

var mountEl = document.getElementById('mount');
var formEl  = document.getElementById('upload');

React.render(mediaLists, mountEl);
React.render(uploader, formEl);
