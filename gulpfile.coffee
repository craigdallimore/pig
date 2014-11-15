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

gulp       = require 'gulp'
sass       = require 'gulp-sass'
gutil      = require 'gulp-util'
browserify = require 'browserify'
es6ify     = require 'es6ify'
source     = require 'vinyl-source-stream'
rename     = require 'gulp-rename'

# Handle browserify errors.
handleError = (err) ->
  gutil.log err.message
  this.emit 'end'

# Tasks relating to JS
gulp.task 'js', ->

  b = browserify
        debug : true

  b.transform es6ify
    .add './static/js/main.js'

  b.bundle()
    .on 'error', handleError
    .pipe source 'app.min.js'
    .pipe gulp.dest './static/dist/'

# Tasks relating to CSS
gulp.task 'css', ->

  gulp.src './static/scss/main.scss'

    # note the sourcemap is appended to the output css
  .pipe sass
    sourceComments : 'map'
    outputStyle    : 'compressed'
    includePaths   : [ 'static/scss/' ]

  .pipe rename 'app.css'

  .pipe gulp.dest './static/dist/'

# Watch task
gulp.task 'watch', ->

  gulp.watch [ 'static/scss/**/*.scss' ], [ 'css' ]
  gulp.watch [ 'static/js/**/*.js' ], [ 'js' ]

# Default task
gulp.task 'default', [ 'js', 'css', 'watch' ]


