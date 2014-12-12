module.exports = (function() {

  'use strict';
  

  return {
    shared: require( './shared' ),
    comment: require( './comment' ),
    imports: require( './imports' ),
    aggregate: require( './aggregate' ),
    print: require( './print' ),
    TestAdaptor: require( './testAdaptor' )
  };

}());