///////////////////////////////////////////////////////////////////////////////
//
// Main
//
//// TODO /////////////////////////////////////////////////////////////////////

//[/] Appraise gulpfile
//[/] Remove backbone etc
//[/] Add browserify
//[/] Use es6ify!
//[!] Add flux / react (use delorean)
//[/] Get socketio working again
//[x] Get file uploads working
//[x] Implement file rename
//[x] Implement file delete
//[x] Implement folders

//// LIBS /////////////////////////////////////////////////////////////////////

// React
const React = require('react');

//// SCENE ////////////////////////////////////////////////////////////////////

let MediaLists = require('./components/media-lists');
let Uploader   = require('./components/uploader');

let mediaLists = MediaLists({
  types : {
    video: { key : 'video-list' , name : 'Videos' , listEvent : 'list:video', children : [] },
    image: { key : 'image-list' , name : 'Images' , listEvent : 'list:image', children : [] },
    audio: { key : 'audio-list' , name : 'Audio'  , listEvent : 'list:audio', children : [] }
  }
});

let uploader = Uploader();

let mountEl = document.getElementById('mount');
let formEl  = document.getElementById('upload');

React.render(mediaLists, mountEl);
React.render(uploader, formEl);
