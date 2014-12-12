(function() {

  'use strict';


  var grunt = require( 'grunt' );
  var fs = require( 'fs-extra' );


  exports['import-clean'] = {

    basic: function( test ) {

      test.expect( 1 );

      var actual = grunt.file.read( 'tmp/basic.json' );
      var expected = grunt.file.read( 'test/basic/output.json' );
      test.equal( actual , expected , 'should describe basic behavior.' );

      test.done();
    },

    multi: function( test ) {

      test.expect( 1 );

      var actual = grunt.file.read( 'tmp/multi.json' );
      var expected = grunt.file.read( 'test/multi/output.json' );
      test.equal( actual , expected , 'should describe multi behavior.' );

      test.done();
    },

    empty: function( test ) {

      test.expect( 1 );

      var actual = grunt.file.read( 'tmp/multi.json' );
      var expected = grunt.file.read( 'test/multi/output.json' );
      test.equal( actual , expected , 'should describe empty behavior.' );

      test.done();
    },

    array: function( test ) {

      test.expect( 1 );

      var actual = grunt.file.read( 'tmp/array.json' );
      var expected = grunt.file.read( 'test/array/output.json' );
      test.equal( actual , expected , 'should describe array behavior.' );

      test.done();
    }

  };

}());



















