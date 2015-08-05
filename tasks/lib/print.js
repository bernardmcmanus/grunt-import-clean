module.exports = (function() {
  'use strict';

  var colors = require( 'colors' );

  function theme( text , name ) {
    text = text.toString();
    switch (name) {
      case 'files':
        return text.cyan;
      case 'imports':
        return text.yellow;
      default:
        return text;
    }
  }

  return function( unused ) {
    var RE_FILES = /(".*")\:/i;
    var RE_IMPORTS = /(".*")\,?$/i;
    var str = JSON.stringify( unused , null , 2 )
      .split( '\n' )
      .map(function( line ) {
        var match;
        if (RE_FILES.test( line )) {
          match = RE_FILES.exec( line );
          match = match ? match[1] : line;
          line = line.replace( RE_FILES , theme( match , 'files' ) + ':');
        }
        else if (RE_IMPORTS.test( line )) {
          match = RE_IMPORTS.exec( line );
          match = match ? (match[0].replace( match[1] , theme( match[1] , 'imports' ))) : line;
          line = line.replace( RE_IMPORTS , match );
        }
        return line;
      })
      .join( '\n' );
    console.log( '\n\n' + str + '\n' );
  }
}());



















