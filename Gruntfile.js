/**
 * ---------------------------------------------------------------
 *  Raptorius Web Kit
 * ---------------------------------------------------------------
 *
 * Template for your new web application.
 *
 * NOTICE OF LICENSE
 *
 * The MIT License (MIT)
 *
 * Copyright (c) Denis Malinochkin
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

/*
 *---------------------------------------------------------------
 * BROWSER VENDOR PREFIXES
 *---------------------------------------------------------------
 *
 * This variable must contain the array of supported browser versions.
 */
var vendor_prefix = [
  'ie >= 9',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 30',
  'safari >= 7',
  'opera >= 21',
  'ios >= 7',
  'android >= 4.2',
  'bb >= 10'
];


/*
 * ---------------------------------------------------------------
 *  PROJECT CONFIGURATION
 * ---------------------------------------------------------------
 */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    appDir: 'app',
    buildDir: 'build',

    clean: {
      fonts: ['<%= buildDir %>/fonts'],
      styles: ['<%= buildDir %>/styles'],
      scripts: ['<%= buildDir %>/scripts'],
      images: ['<%= buildDir %>/images/'],
      html: [
        '<%= buildDir %>/*',
        '!<%= buildDir %>/{fonts,styles,scripts,images}/**'
      ],
      build: ['<%= buildDir %>']
    },

    copy: {
      fonts: {
        expand: true,
        cwd: '<%= appDir %>/fonts/',
        src: '**',
        dest: '<%= buildDir %>/fonts/',
        filter: 'isFile'
      },
      styles: {
        expand: true,
        cwd: '<%= appDir %>/styles/vendor/',
        src: '**',
        dest: '<%= buildDir %>/styles/vendor/',
        filter: 'isFile'
      },
      scripts: {
        expand: true,
        cwd: '<%= appDir %>/scripts/vendor/',
        src: '**',
        dest: '<%= buildDir %>/scripts/vendor/',
        filter: 'isFile'
      },
      images: {
        expand: true,
        cwd: '<%= appDir %>/images/',
        src: '**',
        dest: '<%= buildDir %>/images/',
        filter: 'isFile'
      },
      html: {
        expand: true,
        cwd: '<%= appDir %>/',
        src: '*',
        dest: '<%= buildDir %>/',
        filter: 'isFile'
      }
    },

    csscomb: {
      options: {
        config: '.csscomb.json'
      },
      combFiles: {
        expand: true,
        cwd: '<%= appDir %>/styles/',
        src: ['**/*.less', '!library/**'],
        dest: '<%= appDir %>/styles/'
      }
    },

    less: {
      options: {
        strictMath: true
      },
      devCompileFiles: {
        options: {
          sourceMap: true,
          sourceMapFilename: '<%= buildDir %>/styles/styles.css.map',
          sourceMapURL: '/styles/styles.css.map',
          sourceMapBasepath: '<%= appDir %>',
          sourceMapRootpath: '/'
        },
        files: {
          '<%= buildDir %>/styles/styles.css': '<%= appDir %>/styles/scaffolding.less'
        }
      },
      buildCompileFiles: {
        files: {
          '<%= buildDir %>/styles/styles.css': '<%= appDir %>/styles/scaffolding.less'
        }
      }
    },

    csslint: {
      lintFiles: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: ['<%= buildDir %>/styles/styles.css']
      }
    },

    autoprefixer: {
      options: {
        browsers: vendor_prefix
      },
      devPrefixFiles: {
        options: {
          map: {
            prev: '<%= buildDir %>/styles/'
          }
        },
        src: ['<%= buildDir %>/styles/styles.css']
      },
      buildPrefixFiles: {
        src: ['<%= buildDir %>/styles/styles.css']
      }
    },

    jshint: {
      hintFiles: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [
            '<%= appDir %>/scripts/**/*.js',
            '!<%= appDir %>/scripts/vendor/**/*.js'
          ]
        }
      }
    },

    concat: {
      concatFiles: {
        src: [
          '<%= appDir %>/scripts/**/*.js',
          '!<%= appDir %>/scripts/vendor/**/*.js'
        ],
        dest: '<%= buildDir %>/scripts/scripts.js',
      }
    },

    imagemin: {
      minFiles: {
        files: [{
          expand: true,
          cwd: '<%= appDir %>/images',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: '<%= buildDir %>/images'
        }]
      }
    },

    csso: {
      compressFiles: {
        files: {
          '<%= buildDir %>/styles/styles.min.css': ['<%= buildDir %>/styles/styles.css']
        }
      }
    },

    uglify: {
      compressFiles: {
        files: {
          '<%= buildDir %>/scripts/scripts.min.js': ['<%= buildDir %>/scripts/scripts.js']
        }
      }
    },

    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        stoponerror: true,
        failHard: true,
        reset: true,
        reportpath: false,
        relaxerror: [
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Attribute autocomplete not allowed on element input at this point.',
          'Attribute autocomplete not allowed on element button at this point.'
        ]
      },
      files: {
        src: [
          '<%= appDir %>/*.html',
          '!<%= appDir %>/basic.html'
        ]
      }
    },

    usemin: {
      html: '<%= buildDir %>/*.html'
    },

    includeSource: {
      options: {
        basePath: '<%= appDir %>',
        templates: {
          html: {
            js: '<script src="{filePath}"></script>',
            css: '<link rel="stylesheet" href="{filePath}" />',
          }
        }
      },
      includeFiles: {
        files: [{
          expand: true,
          cwd: '<%= appDir %>/',
          src: '*.html',
          dest: '<%= buildDir %>/',
          filter: 'isFile'
        }]
      }
    },

    browserSync: {
      server: {
        bsFiles: {
          src : ['<%= buildDir %>/**']
        },
        options: {
          server: {
            baseDir: ['<%= buildDir %>', '<%= appDir %>']
          },
          notify: false,
          watchTask: true
        }
      }
    },

    watch: {
      options: {
        spawn: false,
        livereload: true
      },
      fonts: {
        files: ['<%= appDir %>/fonts/**/*'],
        tasks: ['fonts']
      },
      styles: {
        files: ['<%= appDir %>/styles/**/*'],
        tasks: ['styles']
      },
      scripts: {
        files: ['<%= appDir %>/scripts/**/*'],
        tasks: ['scripts']
      },
      images: {
        files: ['<%= appDir %>/images/**/*'],
        tasks: ['images']
      },
      html: {
        files: ['<%= appDir %>/*'],
        tasks: ['html']
      }
    }
  });


/*
 * ---------------------------------------------------------------
 *  INITIALIZING PLUGIN(S)
 * ---------------------------------------------------------------
 */
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html-validation');


/*
 * ---------------------------------------------------------------
 *  INITIALIZING TASK(S)
 * ---------------------------------------------------------------
 */
  grunt.registerTask('default', ['pre-build', 'browserSync', 'watch']);

  grunt.registerTask('pre-html', ['clean:html', 'copy:html', 'includeSource', 'validation']);
  grunt.registerTask('pre-fonts', ['clean:fonts', 'copy:fonts']);
  grunt.registerTask('pre-styles', function(status) {
    status = typeof status !== 'undefined' ? status : 'build';
    grunt.task.run([
      'clean:styles',
      'copy:styles',
      'csscomb',
      'less:' + status + 'CompileFiles',
      'csslint',
      'autoprefixer:' + status + 'PrefixFiles'
    ]);
  });
  grunt.registerTask('pre-scripts', ['clean:scripts', 'copy:scripts', 'jshint', 'concat']);
  grunt.registerTask('pre-images', ['clean:images', 'copy:images']);

  grunt.registerTask('post-minify', ['csso', 'uglify', 'imagemin']);

  grunt.registerTask('pre-build', [
    'clean:build',
    'pre-html',
    'pre-fonts',
    'pre-styles:dev',
    'pre-scripts',
    'pre-images',
    'post-minify'
  ]);
  grunt.registerTask('build', [
    'clean:build',
    'pre-html',
    'usemin',
    'pre-fonts',
    'pre-styles',
    'pre-scripts',
    'pre-images',
    'post-minify'
  ]);
};
