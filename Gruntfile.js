module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    exec: {
      server: {
        cmd: function() {
          return 'http-server -p 9876'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-wrap');

  grunt.registerTask('default', ['uglify']);
};
