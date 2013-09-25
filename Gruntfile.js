'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '_assets/js/*.js',
        '_assets/js/plugins/*.js',
        '!_assets/js/main.min.js'
      ]
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          '_assets/css/main.min.css': [
            '_assets/less/main.less'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '_assets/js/main.min.js': [
            '_assets/js/plugins/*.js',
            '_assets/js/_*.js'
          ]
        }
      }
    },
    imgcompress: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.svg',
          dest: 'images/'
        }]
      }
    },
    watch: {
      less: {
        files: [
          '_assets/less/*.less'
        ],
        tasks: ['recess']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['uglify']
      }
    },
    clean: {
      dist: [
        '_assets/css/main.min.css',
        '_assets/js/main.min.js'
      ]
    }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-imgcompress');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'recess',
    'uglify',
    'imgcompress',
    'svgmin'
  ]);
  grunt.registerTask('dev', [
    'watch'
  ]);

};