module.exports = (function() {

  'use strict';

  return function( input ) {
    var RE_COMMENT1 = /\/\/.*/gi;
    var RE_COMMENT2 = /\/\*.*\*\//gi;
    var RE_COMMENT_OPEN = /\/\*/;
    var RE_COMMENT_CLOSE = /\*\//;

    var isComment;

    return input
    .replace( RE_COMMENT1 , '' )
    .replace( RE_COMMENT2 , '' )
    .split( '\n' )
    .map(function( line ) {
      var out = line;        
      if (RE_COMMENT_OPEN.test( line )) {
        isComment = true;
      }
      if (isComment) {
        out = '';
      }
      if (RE_COMMENT_CLOSE.test( line )) {
        isComment = false;
      }
      return out;
    })
    .join( '\n' );
  };
}());
