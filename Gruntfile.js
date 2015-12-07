/*
 * grunt-import-clean
 * https://github.com/elnarddogg/grunt-import-clean
 *
 * Copyright (c) 2014 Bernard McManus
 * Licensed under the MIT license.
 */

module.exports = function( grunt ) {

  'use strict';

  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    clean: {
      tests: [ 'tmp' ]
    },

    'import-clean': {
      basic: 'test/basic/*.js',
      multi: 'test/multi/*.js',
      empty: 'test/empty/*.js',
      array: [ 'test/array/*-0.js' , 'test/array/*-1.js' ],
      wildcard: 'test/wildcard/*.js',
      default_as: 'test/default_as/*.js',
      options: {
        ignore: [ "something", "$Error", "$_delete" ],
        test: true
      }
    },

    nodeunit: {
      tests: [ 'test/*(_?)test.js' ]
    }
  });

  grunt.loadTasks( 'tasks' );

  [
    'grunt-contrib-jshint',
    'grunt-contrib-clean',
    'grunt-contrib-nodeunit'
  ]
  .forEach( grunt.loadNpmTasks );

  grunt.registerTask( 'default' , [
    'jshint',
    'test',
    'clean'
  ]);

  grunt.registerTask( 'test' , [
    'clean',
    'import-clean',
    'nodeunit'
  ]);
};
