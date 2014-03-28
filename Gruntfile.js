module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('check.jquery.json'),
    concat: {
      options: {
        banner:
          '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        stripBanners: true
      },
      main: {
        src: ['src/jquery.<%= pkg.name %>.js'],
        dest: 'dist/jquery.<%= pkg.name %>.js'
      },
      i18n: {
        src: ['src/i18n/*.js'],
        dest: 'dist/jquery.<%= pkg.name %>-i18n.js'
      },
      type: {
        src: ['src/type/*.js'],
        dest: 'dist/jquery.<%= pkg.name %>-type.js'
      }
    },
    jslint: {
      client: {
        src: [
          'src/**/*.js'
        ],
        directives: {
          browser:  true,
          predef:   ['jQuery'],
          indent:   2,
          plusplus: true,
          regexp:   true
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> <% pkg.author_name %> */\n'
      },
      main: {
        src:  '<%= concat.main.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>.min.js'
      },
      i18n: {
        src:  '<%= concat.i18n.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>-i18n.min.js'
      },
      types: {
        src:  '<%= concat.type.dest %>',
        dest: 'dist/jquery.<%= pkg.name %>-type.min.js'
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-jslint');

  // Default task(s).
  grunt.registerTask('default', ['jslint','concat','uglify']);

};