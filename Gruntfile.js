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
      browserify: {
        files: ['src/**/*.js'],
        tasks: ['browserify', 'default']
      },
      templates: {
        files: ['src/**/*.html'],
        tasks: ['jst']
      }
    },
    jst: {
      compile: {
        files: {
          "dist/templates.js": ["src/views/**/*.html"]
        }
      }
    },
    usemin: {
      html: ['index.html'],
    },
    useminPrepare: {
      options: {
        dest: 'build'
      },
      html: 'index.html'
    },
    wrap: {
      basic: {
        expand: false,
        src: ['./build/build.js'],
        dest: './',
        options: {
          wrapper: ['(function() {\n', '\n})();']
        }
      }
    },
    clean: {
      build: {
        src: ['./build']
      }
    },
    rename: {
      rn: {
        src: './build/build.js',
        dest: './build/<%= pkg.name %>.<%= pkg.version %>.js'
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-wrap');
  grunt.loadNpmTasks('grunt-rename');

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'wrap',
    'rename'
  ]);
}
