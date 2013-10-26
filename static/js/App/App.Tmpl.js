this["App"] = this["App"] || {};
this["App"]["Tmpl"] = this["App"]["Tmpl"] || {};

this["App"]["Tmpl"]["static/templates/audio"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '';}return __p};

this["App"]["Tmpl"]["static/templates/image"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<img src="' +((__t = ( path )) == null ? '' : __t) +'" width="120" alt="' +((__t = ( name )) == null ? '' : __t) +'"/>\n<a href="' +((__t = ( path )) == null ? '' : __t) +'">' +((__t = ( name )) == null ? '' : __t) +'</a>\n\n';}return __p};

this["App"]["Tmpl"]["static/templates/sample"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<p>This is sample HTML. Kaizen.</p>\n';}return __p};

this["App"]["Tmpl"]["static/templates/video"] = function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<a href="' +((__t = ( path )) == null ? '' : __t) +'">' +((__t = ( name )) == null ? '' : __t) +'</a>\n\n';}return __p};