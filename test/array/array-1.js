import {
  $_defineProperty,
  $_keys,
  $_ensureFunc,
  $_isArray,
  $_forEach,
  $_EVT
} from 'static/shared';


export default function( subject ) {

  var inprog = false/*, __maxWatchers = 10, watchers = []*/;

  $_defineProperty( subject , '__stack' , {
    value: []
  });

  $_defineProperty( subject , '__inprog' , {
    get: function() {
      return inprog;
    },
    set: function( value ) {
      inprog = value;
    }
  });

  /*$_defineProperty( subject , '__maxWatchers' , {
    get: function() {
      return __maxWatchers;
    },
    set: function( value ) {
      __maxWatchers = value;
    }
  });*/

  $_defineProperty( subject , '__events' , {
    get: function() {
      return $_keys( subject.handlers );
    }
  });

  $_defineProperty( subject , 'handlers' , {
    value: {}
  });

  /*$_defineProperty( subject , 'watchers' , {
    get: function() {
      return watchers;
    },
    set: function( value ) {
      watchers = $_isArray( value ) ? value : [];
    }
  });*/

  $_defineProperty( subject , 'handleE$' , {
    value: $_ensureFunc( subject.handleE$ ).bind( subject )
  });

  $_defineProperty( subject , '__handleE$' , {
    value: subject.__handleE$.bind( subject )
  });

  $_forEach( $_keys( $_EVT ) , function( key ) {
    var evt = $_EVT[key];
    var evtHandler = subject.__add( evt , subject.__handleE$ , subject );
    evtHandler.locked = true;
  });
}



















