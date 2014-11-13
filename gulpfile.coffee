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
browserify = require 'gulp-browserify'
rename     = require 'gulp-rename'

# Tasks relating to JS
gulp.task 'js', ->

  gulp.src './static/js/main.js'
  .pipe browserify
    debug : true

  .on 'error', gutil.log
  .pipe rename 'app.min.js'
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


