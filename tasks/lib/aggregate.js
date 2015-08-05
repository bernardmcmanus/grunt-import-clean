module.exports = (function() {

  'use strict';

  var path = require( 'path' );

  return function( files ) {
    var result = {
      unused: {},
      totalFiles: files.length,
      foundFiles: 0,
      foundImports: 0
    };

    files.forEach(function( file ) {
      var name = path.basename( file.src );
      if (file.unused.length) {
        result.unused[name] = file.unused;
        result.foundFiles++;
        result.foundImports += file.unused.length;
      }
    });

    return result;
  };
}());
