'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    // очистка дирректории
    clean: {
      build: [
        'build'
      ]
    },

    // вывод
    cmq: {
      options: {
        log: false
      },
      css_create: {
        files: {
          'build/css/main.css': ['build/css/main.css']
        }
      }
    },

    // копирование
    copy: {
      img: {
        expand: true,
        cwd: 'src/img/',
        src: ['**/*.{png,jpg,gif,svg}'],
        dest: 'build/img/'
      },
      fonts: {
        expand: true,
        cwd: 'src/fonts/',
        src: ['**/*.{eot,svg,woff,woff2,ttf}'],
        dest: 'build/fonts/'
      },
      html: {
        expand: true,
        cwd: 'src/',
        src: ['*.html'],
        dest: 'build/'
      }
    },

    // sass
    sass: {
      dist: {
        options: {
          sourcemap: 'inline',
          style: 'expanded'
        },
        files: {
          'build/css/main.css': 'src/scss/main.scss'
        }
      }
    },

    // автопрефиксер
    autoprefixer: {
      options: {
        browsers: ['last 15 versions', 'ie 8', 'ie 9', 'ie 10'],
        map: true
      },
      style: {
        src: 'build/css/main.css'
      }
    },

    // наведение лоска css
    csscomb: {
      style: {
        options: {
          config: 'csscomb.json'
        },
        files: {
          'build/css/main.css': ['build/css/main.css']
        }
      }
    },

    // сжатие css
    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'build/css/main.min.css': ['build/css/main.css']
        }
      }
    },

    // создание js
    concat: {
      main: {
        src: ['src/js/main.js'],
        dest: 'build/js/main.js'
      }
    },

    // сжатие js
    uglify: {
      start: {
        files: {
          'build/js/main.min.js': ['build/js/main.js']
        }
      }
    },

    // оптимизация графики
    imagemin: {
      build: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          src: [
            'build/img/*.{png,jpg,gif,svg}'
          ]
        }]
      }
    },

    // отслеживаем изменений
    watch: {
      style: {
        files: ['src/scss/**/*.scss'],
        tasks: ['style'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      scripts: {
        files: ['src/js/**/*.js'],
        tasks: ['js'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      images: {
        files: ['src/img/**/*.{png,jpg,gif,svg}'],
        tasks: ['img'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      html: {
        files: ['src/*.html'],
        tasks: ['copy:html'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },

    // автоперезагрузка
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'build/css/*.css',
            'build/js/**/*.js',
            'build/fonts/**/*.*',
            'build/img/**/*.{png,jpg,gif,svg}',
            'build/**/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: 'build/'
          },
          startPath: '/index.html',
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    }
  });

  // базовый таск
  grunt.registerTask('default', [
    'clean',
    'copy',
    'sass',
    'cmq',
    'autoprefixer',
    'csscomb',
    'cssmin',
    'concat',
    'uglify',
    'imagemin',
    'browserSync',
    'watch'
  ]);

  // билдовый таск
  grunt.registerTask('build', [
    'clean',
    'copy',
    'sass',
    'cmq',
    'autoprefixer',
    'csscomb',
    'cssmin',
    'concat',
    'uglify',
    'imagemin'
  ]);

  // только стили
  grunt.registerTask('style', [
    'sass',
    'cmq',
    'autoprefixer',
    'csscomb',
    'cssmin'
  ]);

  // только js
  grunt.registerTask('js', [
    'concat',
    'uglify'
  ]);

  // только картики
  grunt.registerTask('img', [
    'copy:img',
    'imagemin'
  ]);
};