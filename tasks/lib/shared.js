module.exports = (function() {
  'use strict';
  return {
    ensureArray: function( subject ) {
      return (Array.isArray( subject ) ? subject : ( subject !== undefined ? [ subject ] : [] ));
    },
    escRegExp: function( str ) {
      return str.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g , '\\$&' );
    }
  };
}());
