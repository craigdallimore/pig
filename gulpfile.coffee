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
# $ gulp --require coffee-script

gulp   = require 'gulp'
sass   = require 'gulp-sass'
rename = require 'gulp-rename'

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

  gulp.watch [ './static/scss/**/*.scss' ], [ 'css' ]

# Default task
gulp.task 'default', [ 'css', 'watch' ]


