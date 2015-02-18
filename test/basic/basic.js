import E$ from 'main';
import { isPrivate , getPublic } from 'event';
import when from 'when';
import * as something from 'somewhere';
import isE$ from 'static/is-emoney';
import construct from 'static/construct';
import {
  $Error,
  $_create,
  $_delete,
  $_is,
  /*
  $_ensureBranch,
  */
  $_indexOf,
  $_slice,
  $_shift,
  $_pop,
  $_forEach,
  $_length,
  $_EVT
} from 'static/shared';


export default Proto();


function Proto() {

  var proto = $_create( when );

  proto.__init = function( that , seed ) {
    for (var key in seed) {
      that[key] = seed[key];
    }
    construct( that );
  };

  proto.__handleE$ = function() {

    var that = this;
    var args = $_slice( arguments );
    var e = $_shift( args );
    var type = $_shift( args );
    var pubArgs = $_pop( args );
    var shouldEmit = (type && getPublic( e.type ) !== type);

    if (shouldEmit) {
      that.$emit( getPublic( e.type ) , pubArgs );
    }

    if (e.type === $_EVT.$emit && isPrivate( type )) {
      that.$emit( getPublic( type ) , pubArgs[1] );
    }
  };

  proto.$set = function( key , value ) {
    var that = this;
    that[key] = value;
    that.$emit( $_EVT.$set , [ key , [ key ]]);
    return that;
  };

  proto.$unset = function( key ) {
    var that = this;
    var target = that[key];
    if (isE$( target )) {
      target.$deref();
    }
    that.$emit( $_EVT.$unset , [ key , [ key ]]);
    return that;
  };

  proto.$deref = function() {
    var that = this;
    that.$emit( $_EVT.$deref );
    that.$dispel( null , null , true );
  };

  proto.$enq = function( task ) {
    var that = this;
    that.__stack.push( task );
  };

  proto.$digest = function() {
    
    var that = this;
    var stack = that.__stack;

    if (that.__inprog) {
      return;
    }

    that.__inprog = true;

    while ($_length( stack ) > 0) {
      $_shift( stack )();
    }
    
    that.__inprog = false;
  };

  return proto;
}



















