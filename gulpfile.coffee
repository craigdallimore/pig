###############################################################################
#
# gulpfile.coffee
#
# [About gulp](https://github.com/gulpjs/gulp/)
# [About coffeescript](http://coffeescript.org/)
#
# Make sure you have coffee-script:
# ---------------------------------
# $ npm install coffee-script -s
#
# To run:
# -------
# $ gulp
#
#### IMPORTS ##################################################################

gulp       = require 'gulp'
sass       = require 'gulp-sass'
gutil      = require 'gulp-util'
browserify = require 'browserify'
reactify   = require 'reactify'             # Transform for .jsx
es6ify     = require 'es6ify'               # Transform for es6 -> es5
source     = require 'vinyl-source-stream'  # Bridge text stream -> gulp stream
rename     = require 'gulp-rename'

#### HELPERS ##################################################################

# Handle browserify errors.
handleError = (err) ->
  gutil.log err.message
  this.emit 'end'

#### FILES / FOLDERS  #########################################################

jsEntryFile   = './static/js/main.js'
jsPath        = './static/js/'
jsBundle      = 'app.min.js'

scssEntryFile = './static/scss/main.scss'
scssPath      = './static/scss/'
cssBundle     = 'app.css'

destFolder    = './static/dist/'

#### JS TASKS #################################################################
#
gulp.task 'js', ->

  b = browserify jsEntryFile,
        debug : true

  b.transform reactify                  # Transform .jsx
  b.transform es6ify.configure(/.jsx?/) # Apply to .js and .jsx files

  b.bundle()
    .on 'error', handleError
    .pipe source jsBundle
    .pipe gulp.dest destFolder

#### CSS TASKS ################################################################

gulp.task 'css', ->

  gulp.src scssEntryFile

    # note the sourcemap is appended to the output css
  .pipe sass
    sourceComments : 'map'
    outputStyle    : 'compressed'
    includePaths   : [ scssPath ]

  .pipe rename cssBundle
  .pipe gulp.dest destFolder

#### WATCH TASK ###############################################################

gulp.task 'watch', ->

  gulp.watch [
    scssPath + '**/*.scss'
  ], [ 'css' ]

  gulp.watch [
    jsPath + '**/*.js'
    jsPath + '**/*.jsx'
  ], [ 'js' ]

#### DEFAULT TASK #############################################################

gulp.task 'default', [ 'js', 'css', 'watch' ]

#### KAIZEN ###################################################################
