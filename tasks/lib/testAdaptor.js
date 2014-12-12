module.exports = (function() {

  'use strict';
  

  // write test output


  var path = require( 'path' );
  var fs = require( 'fs-extra' );

  
  function Test( taskDir ) {
    var that = this;
    that.tmp = path.join( taskDir , '../tmp' );
    fs.ensureDirSync( that.tmp );
  }


  Test.prototype = {
    write: function( target , output ) {
      var that = this;
      var dest = path.join( that.tmp , target + '.json' );
      fs.writeJsonSync( dest , output );
    }
  };


  return Test;


}());