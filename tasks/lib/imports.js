module.exports = (function() {

  'use strict';


  // extract imports for each file and return as an array


  return function( file ) {

    var RE_EXTRACT = /^(import(?:[^;]|\n)*from.*(?:'|"|;))$/gmi;
    var RE_START = /^import/i;
    var RE_END = /from.*('|"|;)$/i;
    var RE_CLEAN = /\s(\*|default)\sas\s|'|"|\s|\t/gi;
    var RE_PARSE1 = /import(.*)from/i;
    var RE_PARSE2 = /\{(.*)\}/i;

    var input = file.input;
    var text = input.match( RE_EXTRACT );
    var imports = [];
    var block = null;

    if (text) {

      input = input.replace( RE_EXTRACT , '' );

      text.forEach(function( line ) {

        if (RE_START.test( line )) {
          block = [];
        }

        if (Array.isArray( block )) {
          block.push( line );
        }
        
        if (RE_END.test( line )) {
          imports.push( block );
          block = null;
        }

      });

      imports = imports
        .filter(function( $import ) {
          return !!$import;
        })
        .reduce(function( prev , current ) {
          var str = current.join( '' ).replace( RE_CLEAN , '' );
          var match = RE_PARSE1.exec( str );
          match = match ? match[1] : null;
          if (RE_PARSE2.test( match )) {
            match = RE_PARSE2.exec( match );
            match = match ? match[1].split( ',' ) : null;
          }
          return prev.concat( match );
        },[]);
    }

    file.input = input;
    file.imports = imports;

    return file;

  };


}());



















