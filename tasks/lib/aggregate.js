module.exports = (function() {

  'use strict';

  var path = require( 'path' );

  return function( files, importsToIgnore ) {

    var result = {
      unused: {},
      totalFiles: files.length,
      foundFiles: 0,
      foundImports: 0,
      ignoredImports: 0
    };

    var isIgnoredImport = function( unused ) {
      return importsToIgnore.indexOf(unused) != -1;
    };

    var reportUnusedImport = function( unused ) {
      if (isIgnoredImport( unused )) {
        result.ignoredImports++;
        return unused + '   (IGNORED)';
      } else {
        result.foundImports++;
        return unused;
      }
    };

    files.forEach(function( file ) {
      var name = path.basename( file.src );
      if (file.unused.length) {
        result.unused[name] = file.unused.map(reportUnusedImport);
        result.foundFiles++;
      }
    });

    return result;
  };
}());
