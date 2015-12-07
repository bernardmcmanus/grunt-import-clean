module.exports = function( grunt ) {

  'use strict';

  var fs = require( 'fs-extra' );
  var colors = require( 'colors' );
  var lib = require( './lib' );
  var shared = lib.shared;
  var comment = lib.comment;
  var imports = lib.imports;
  var aggregate = lib.aggregate;
  var print = lib.print;
  var TestAdaptor = lib.TestAdaptor;

  var pkg = fs.readJsonSync( './package.json' );

  grunt.registerMultiTask( 'import-clean' , pkg.description , function() {

    var that = this;
    var options = that.options({ test: false, force: false });
    var data = shared.ensureArray( that.data );
    var testAdaptor = options.test ? new TestAdaptor( __dirname ) : testAdaptor;

    var files = data.reduce(function( prev , current ) {
      return prev.concat(
        grunt.file.expand( current )
      );
    },[]);

    process.stdout.write(
      'Validating imports in ' +
      files.length + ' files... '
    );

    files = files.map(function( src ) {
      return {
        src: src,
        input: comment(
          fs.readFileSync( src , 'utf-8' )
        )
      };
    })
    .map(function( file ) {
      file = imports( file );
      file.unused = file.imports.filter(function( name ) {
        name = shared.escRegExp( name );
        var re = new RegExp( '(^|\\W)' + name + '(\\W?|$)' );
        return !re.test( file.input );
      });
      return file;
    });

    var importsToIgnore = options.ignore ? ( options.ignore.constructor === Array ? options.ignore : [ options.ignore ] ) : [];
    var result = aggregate( files, importsToIgnore );
    var msg;

    if (options.test) {
      testAdaptor.write( that.target , result );
      msg = '\ntest output written to tmp/' + that.target + '.json';
      console.log( msg.yellow );
    }
    else if (result.foundFiles) {

      print( result.unused );

      msg = 'found ' + (result.foundImports + result.ignoredImports) +
        ' unused imports in ' + result.foundFiles +
        ' file' + (result.foundFiles > 1 ? 's' : '') +
        (result.ignoredImports > 0 ? (' (' + result.ignoredImports + ' IGNORED)') : '') + '.';

      // grunt.option( 'force' , true ) will force all subsequent tasks.
      // this handles the force option politely.
      if (options.force || result.foundImports === 0) {
        console.log(( 'Warning: ' + msg ).yellow );
      }
      else {
        grunt.fail.warn( msg );
      }
    }
    else {
      console.log( '\u2713 OK'.green );
    }

  });
};
