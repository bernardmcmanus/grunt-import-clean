module.exports = (function() {

  'use strict';
  

  var UNDEFINED;
  

  return {

    ensureArray: function( subject ) {
      return (Array.isArray( subject ) ? subject : ( subject !== UNDEFINED ? [ subject ] : [] ));
    },

    escRegExp: function( str ) {
      return str.replace( /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g , '\\$&' );
    }

  };


}());



















