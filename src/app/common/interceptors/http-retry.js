'use strict';

import {Service, Inject} from '../../decorators/decorators'

let self;
@Service( {
  serviceName: 'HttpRetryInterceptor'
} )
@Inject( '$injector' )
class HttpRetryInterceptor {
  constructor( $injector ) {
    self = this; // http://stackoverflow.com/questions/28638600/angularjs-http-interceptor-class-es6-loses-binding-to-this
    this.$injector = $injector;
  }

  responseError( rejection ) {
    //http://jcrowther.io/2015/05/19/angular-js-http-interceptors/
    // retry request for 503 failure
    if ( rejection.status !== 503 ) {
      return Promise.reject( rejection );
    }
    if ( rejection.config.retry ) {
      rejection.config.retry++;
    } else {
      rejection.config.retry = 1;
    }

    if ( rejection.config.retry < 5 ) {
      return self.$injector.get( '$http' )( rejection.config );
    } else {
      return Promise.reject( rejection );
    }
  }
}

export default HttpRetryInterceptor;
