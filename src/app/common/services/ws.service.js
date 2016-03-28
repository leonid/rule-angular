angular.module( 'ngxively', [] ).factory( 'ngxively', function ( $q, $rootScope ) {
  console.log( 'ngxively Service' );

  var ngxively = {
    connState: false
  };

  var tokens = [];
  var ws;
  var req = {};

  ngxively.connect = function ( wsUrl ) {

    ws = new WebSocket( wsUrl );

    ws.onopen = function () {
      console.log( 'ws conn to ' + wsUrl + ' opened' );
      ngxively.connState = true;
      sendWsMsg( 'wsConnected', null );
    };

    ws.onmessage = function ( message ) {
      listener( JSON.parse( message.data ) );
    };

    ws.onerror = function () {
      console.log( "ws error" );
      ngxively.connState = false;
    };

    ws.onclose = function () {
      console.log( "ws closed" );
      ngxively.connState = false;
      sendWsMsg( 'wsClosed', null );
    };

    var listener = function ( data ) {
      var msg = data;
      console.log( 'ws-data', msg );
      if ( tokens.hasOwnProperty( msg.token ) ) {
        $rootScope.$apply( tokens[msg.token].tk.resolve( msg ) );
        delete tokens[msg.token];
      } else {
        sendWsMsg( 'wsMsg', msg );
      }
    };

    var sendWsMsg = function ( signal, data ) {
      $rootScope.$broadcast( signal, data );
    };

  };


  var sendRequest = function ( request ) {
    req.def = $q.defer();
    req.token = request.token;
    tokens[req.token] = {
      time: new Date(),
      tk: req.def
    };
    if ( ws ) {
      ws.send( JSON.stringify( request ) );
      console.log( 'sendRequest:', request );
      return req.def.promise;
    }
  };

  ngxively.close = function () {
    ws.close();
  };

  ngxively.setApikey = function ( apikey ) {
    ngxively.apikey = apikey;
  };

  ngxively.product = {
    allGet: function () {
      var request = {
        headers: {'X-ApiKey': ngxively.apikey},
        method: 'get',
        token: 'product_all_get',
        resource: '/products'
      };
      return sendRequest( request );
    },
    get: function ( productId ) {
      var request = {
        headers: {'X-ApiKey': ngxively.apikey},
        method: 'get',
        token: 'product_get' + productId,
        resource: '/products/' + productId
      };
      return sendRequest( request );
    }
  };

  ngxively.device = {
    allGet: function ( productId ) {
      var request = {
        headers: {'X-ApiKey': ngxively.apikey},
        method: 'get',
        token: 'device_all_get' + productId,
        resource: '/products/' + productId + '/devices'
      };
      return sendRequest( request );
    },
    get: function ( productId, serial ) {
      var request = {
        headers: {'X-ApiKey': ngxively.apikey},
        method: 'get',
        token: 'device_get' + productId,
        resource: '/products/' + productId + '/devices/' + serial
      };
      return sendRequest( request );
    }
  };

  ngxively.feed = {
    get: function ( feedId ) {
      var request = {
        headers: {'X-ApiKey': ngxively.apikey},
        method: 'get',
        token: 'feed_get' + feedId,
        resource: '/feeds/' + feedId
      };
      return sendRequest( request );
    }
  };

  ngxively.trigger = {
    feedGet: function ( feedId ) {
      var request = {
        headers: {'X-ApiKey': ngxively.apikey},
        method: 'get',
        token: 'trigger_feed_get' + feedId,
        resource: '/triggers/?feed_id=' + feedId
      };
      return sendRequest( request );
    }
  };

  ngxively.live = {
    subscribe: function ( resource, token ) {
      var request = {
        headers: {'X-ApiKey': ngxively.apikey},
        method: 'subscribe',
        token: token,
        resource: resource
      };
      return sendRequest( request );
    },
    unsubscribe: function ( resource, token ) {
      var request = {
        headers: {'X-ApiKey': ngxively.apikey},
        method: 'unsubscribe',
        token: token,
        resource: resource
      };
      return sendRequest( request );
    }
  };

  return ngxively;
} )
;