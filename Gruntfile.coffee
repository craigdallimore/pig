module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-sass'

  grunt.initConfig
    dirs:
      base:     'static/'
      css:      'static/css/'
      scss:     'static/scss/'
      dist:     'static/dist/'

    sass:
      dist:
        options:
          sourcemap: true
        files:
          '<%= dirs.dist %>app.css': '<%= dirs.scss %>main.scss'

    watch:
      scss:
        files: '<%= dirs.scss %>**/*.scss'
        tasks: 'sass'

  grunt.registerTask 'default', ['sass']
