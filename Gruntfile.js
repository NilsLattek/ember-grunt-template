var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
  return connect.static(path.resolve(point));
};

module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      'build/application.js': 'build/application.js'
    },

    /* Concat css */
    mincss: {
      compress: {
        files: {
          'build/application.css': ['app/css/**/*.css']
        }
      }
    },

    /* Optimize images */
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '*.{png,jpg,jpeg}',
          dest: 'build/images'
        }]
      }
    },

    /* remove image backups */
    clean: {
      imageBackups: ['build/images/**/*.bak']
    },

    /* copy other files like icons */
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'build',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'index.html'
          ]
        }]
      }
      /*move files into app folders: phonegap: {

      }*/
    },

    /* resolve dependencies */
    neuter: {
      development: {
        options: {
          includeSourceURL: true
        },
        files: {
          'build/application.js': 'app/js/main.js'
        }
      },
      production: {
        options: {
          includeSourceURL: false
        },
        files: {
          'build/application.js': 'app/js/main.js'
        }
      }
    },

    /* precompile ember templates */
    ember_templates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/app\/templates\//, '');
        }
      },
      'tmp/templates.js': ["app/templates/*.hbs"]
    },

    /* watch files and run tasks on change */
    regarde: {
      application_code: {
        files: ['tmp/templates.js', 'app/js/**/*.js', 'test/**/*.js'],
        tasks: ['neuter:development', 'livereload']
      },
      handlebars_templates: {
        files: ['app/templates/**/*.hbs'],
        tasks: ['ember_templates', 'neuter:development', 'livereload']
      },
      css: {
        files: ['app/css/**/*.css'],
        tasks: ['mincss', 'livereload']
      }
    },

    /* start livereload server */
    connect: {
      livereload: {
        options: {
          port: 8000,
          middleware: function(connect, options) {
            return [lrSnippet, folderMount(connect, '.')];
          }
        }
      }
    },

    /* build test runner so that we do not have to include each test script manually */
    build_test_runner_file: {
      all: ['test/**/*.test.js']
    },

    /* run mocha tests using phantomjs */
    mocha: {
      all: {
        src: ['test/testrunner.html'],
        options: {
          run: true
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerMultiTask('build_test_runner_file', 'Creates a test runner file.', function(){
    var tmpl = grunt.file.read('test/testrunner.html.template');
    var renderingContext = {
      data: {
        files: this.filesSrc.map(function(fileSrc){
          return fileSrc.replace('test/', '');
        })
      }
    };
    grunt.file.write('test/testrunner.html', grunt.template.process(tmpl, renderingContext));
  });

  grunt.registerTask('build', ['ember_templates', 'neuter:production', 'uglify', 'mincss', 'imagemin', 'copy', 'clean:imageBackups']);

  grunt.registerTask('test', ['ember_templates', 'neuter:development', 'build_test_runner_file', 'mocha']);

  grunt.registerTask('default', ['livereload-start', 'connect', 'ember_templates', 'neuter:development', 'mincss', 'imagemin', 'copy', 'regarde']);
};
