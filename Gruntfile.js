module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      main: {
        src: 'src/*.js',
        dest: 'dist/bundle.js'
      }
    },
    watch: {
      files: 'src/*',
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
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', ['browserify', 'watch']);
}
