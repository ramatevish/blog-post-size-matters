module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      files: ['build']
    },
    uglify: {
      minified: {
        options: {
          mangle: false
        },
        files: [{
          expand: true,
          flatten: true,
          src: 'src/*.js',
          dest: 'build/minified'
        }]
      },
      mangled: {
        files: [{
          expand: true,
          flatten: true,
          src: 'src/*.js',
          dest: 'build/mangled'
        }]
      }
    },
    compress: {
      build: {
        options: {
          mode: 'gzip'
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['build/minified/*.js'],
            dest: 'build/minified-compressed'
          },
          {
            expand: true,
            flatten: true,
            src: ['build/mangled/*.js'],
            dest: 'build/mangled-compressed'
          }
        ]
      },
    },
    size_report: {
        base: {
          files: {
            list: ['src/*.js']
          }
        },
        minified: {
          files: {
            list: ['build/minified/*.js']
          }
        },
        mangled: {
          files: {
            list: ['build/mangled/*.js']
          }
        },
        'minified-compressed': {
          files: {
            list: ['build/minified-compressed/*.js']
          }
        },
        'mangled-compressed': {
          files: {
            list: ['build/mangled-compressed/*.js']
          }
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-size-report');

  grunt.registerTask('default', ['uglify:minified', 'uglify:mangled', 'compress', 'size_report']);

};
