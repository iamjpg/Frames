module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      main: {
        src: 'src/**/*.js',
        dest: 'dist/bundle.js'
      }
    },
    watch: {
      files: 'src/**/*.js',
      tasks: ['browserify', 'default']
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/contrib/*.js', 'dist/bundle.js'],
        dest: 'dist/bundle.js',
      },
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: './dist/bundle.js',
        dest: 'build/frames.<%= pkg.version %>.min.js'
      }
    },
    copy: {
      main: {
        files: [
          // includes files within path and its sub-directories
          {expand: true, src: ['src/views/**'], dest: 'build/'},
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['browserify', 'watch']);
}
