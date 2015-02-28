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
        dest: 'build/<%= pkg.version %>.min.js'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['browserify', 'watch']);
}
