/**
 * Raptorius Web Kit
 * --
 * Template for your new web application.
 */

'use strict';

/**
 * Autoprefixer config
 * @type {Array}
 */
var autoprefixerConfig = [
  '> 5%',
  'last 2 versions',
  'android 4'
];

// Grunt configuration
var configureGrunt = function(grunt) {

  // Time evaluation && loading Grunt tasks
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  // Project Configuration
  var configTasks = {

    // ### grunt-contrib-watch
    // Watch files and run tasks
    watch: {
      options: {
        spawn: false
      },

      // Synchronize directory
      sync: {
        files: [
          './app/*',
          './app/fonts/**',
          './app/images/**',
          './app/styles/vendor/**',
          './app/scripts/vendor/**'
        ],
        tasks: ['sync']
      },

      // HTML files and Bower components
      html: {
        files: ['./app/templates/**'],
        tasks: ['jade', 'htmlhint']
      },

      bower: {
        files: ['./bower.json'],
        tasks: ['wiredep']
      },

      // Styles
      styles: {
        files: ['./app/styles/less/**'],
        tasks: ['less:development', 'csslint']
      },

      // Scripts
      scripts: {
        files: ['./app/scripts/**'],
        tasks: ['jshint', 'jscs', 'concat']
      }
    },

    // ### grunt-concurrent
    // Run grunt tasks concurrently
    concurrent: {
      compileDev: ['sync', 'styles', 'html', 'scripts'],
      compileProd: [
        'sync',
        'styles:production',
        'html:production',
        'scripts:production',
        'images'
      ]
    },

    // ### grunt-contrib-clean
    // Clean files and folders
    clean: {
      build: ['./build'],
      html: ['./build/*.html'],
      styles: ['./build/styles/*.css'],
      scripts: ['./build/scripts/*js']
    },

    // ### grunt-sync
    // Synchronize APP directory and BUILD
    sync: {
      main: {
        files: [{
          cwd: './app',
          src: [
            '**',
            '!styles/**',
            'styles/vendor/**',
            '!scripts/**',
            'scripts/vendor/**',
            '!templates/**'
          ],
          dest: './build/'
        }],
        updateAndDelete: true
      }
    },

    // ### grunt-contrib-less
    // Compile LESS files to CSS.
    less: {
      options: {
        plugins: [
          new (require('less-plugin-autoprefix'))({
            browsers: autoprefixerConfig
          })
        ]
      },
      development: {
        options: {
          sourceMap: true,
          sourceMapFilename: './build/styles/styles.css.map',
          sourceMapURL: '/styles/styles.css.map',
          sourceMapBasepath: 'app',
          sourceMapRootpath: '/'
        },
        files: {
          './build/styles/styles.css': './app/styles/less/styles.less'
        }
      },
      production: {
        files: {
          './build/styles/styles.css': './app/styles/less/styles.less'
        }
      }
    },

    // ### grunt-recess
    // Lint CSS and LESS
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      dist: ['./build/styles/styles.css']
    },

    // ### grunt-csscomb
    // CSS coding style formatter
    csscomb: {
      options: {
        config: '.csscomb.json'
      },
      main: {
        files: {
          './build/styles/styles.css': ['./build/styles/styles.css']
        }
      }
    },

    // ###
    // Combine matching media queries into one media query definition
    combine_mq: {
      main: {
        src: './build/styles/styles.css',
        dest: './build/styles/styles-cmq.css'
      }
    },

    // ### grunt-csso
    // Minify CSS files with CSSO.
    csso: {
      main: {
        files: {
          './build/styles/styles.min.css': './build/styles/styles.css',
          './build/styles/styles-cmq.min.css': './build/styles/styles-cmq.css'
        }
      }
    },

    // ### grunt-contrib-jade
    // Compile Jade templates
    jade: {
      options: {
        pretty: true
      },
      main: {
        files: [{
          expand: true,
          cwd: './app/templates',
          ext: '.html',
          src: ['*.jade'],
          dest: './build/'
        }]
      }
    },

    // ### grunt-htmlhint
    // Lint html files with htmlhint
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      main: {
        src: ['./build/*.html']
      }
    },

    // ### grunt-wiredep
    // Inject your Bower dependencies right into your HTML from Grunt
    wiredep: {
      main: {
        src: ['./build/*.html']
      }
    },

    // ### grunt-contrib-jshint
    // Validate files with JSHint
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      main: [
        './app/scripts/**/*.js',
        '!./app/scripts/vendor/**'
      ]
    },

    // ### grunt-jscs
    // Checking JavaScript Code Style
    jscs: {
      options: {
        config: '.jscsrc'
      },
      main: [
        './app/scripts/**/*.js',
        '!./app/scripts/vendor/**'
      ]
    },

    // ### grunt-contrib-concat
    //
    concat: {
      main: {
        src: ['./app/scripts/**/*.js', '!./app/scripts/vendor/**'],
        dest: './build/scripts/scripts.js',
        nonull: true
      }
    },

    // ### grunt-contrib-uglify
    // Minify files with UglifyJS
    uglify: {
      main: {
        files: {
          './build/scripts/scripts.min.js': ['./build/scripts/scripts.js']
        }
      }
    },

    // ### grunt-contrib-imagemin
    // Minify images
    imagemin: {
      options: {
        progressive: true,
        interlaced: true
      },
      main: {
        files: [{
          expand: true,
          cwd: './app/images/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: './build/images/'
        }]
      }
    },

    // ### grunt-browser-sync
    // Time-saving synchronised browser testing
    browserSync: {
      development: {
        options: {
          watchTask: true,
          server: {
            baseDir: ['./app/', './build/']
          }
        }
      }
    }

  };

  // Load the configuration
  grunt.initConfig(configTasks);

  // Initialize tasks
  grunt.registerTask('default', [
    'concurrent:compileDev',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:build',
    'concurrent:compileProd'
  ]);

  // Tasks for RWK CLI
  grunt.registerTask('html', function(status) {
    status = typeof status !== 'undefined' ? status : 'development';
    if (status === 'production') {
      grunt.task.run(['clean:html']);
    }

    grunt.task.run(['jade', 'htmlhint', 'wiredep']);
  });

  grunt.registerTask('styles', function(status) {
    status = typeof status !== 'undefined' ? status : 'development';
    if (status === 'production') {
      grunt.task.run(['clean:styles']);
    }

    grunt.task.run([
      'less:' + status,
      'csslint',
      'csscomb'
    ]);

    if (status === 'production') {
      grunt.task.run([
        'combine_mq',
        'csso'
      ]);
    }
  });

  grunt.registerTask('scripts', function(status) {
    status = typeof status !== 'undefined' ? status : 'development';
    if (status === 'production') {
      grunt.task.run(['clean:scripts']);
    }

    grunt.task.run([
      'jshint',
      'jscs',
      'concat'
    ]);

    if (status === 'production') {
      grunt.task.run([
        'uglify'
      ]);
    }
  });

  grunt.registerTask('images', ['imagemin']);

  // Task for NPM postinstall
  // Create `vendor` directories
  grunt.registerTask('postinstall', function() {
    var vendorDirs = [
      './app/fonts/',
      './app/images/icons/',
      './app/scripts/vendor/',
      './app/styles/vendor/'
    ];
    vendorDirs.forEach(function(dir) {
      if (!grunt.file.exists(dir)) {
        grunt.file.mkdir(dir);
      }
    });
    grunt.log.ok('The project is now ready for use!');
  });
};

// Export the configuration
module.exports = configureGrunt;
