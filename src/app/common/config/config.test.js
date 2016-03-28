'use strict';

/**
 * Stubbing of HTTP requests for backend-less frontend testing
 */
import 'angular-mocks';
import angular from 'angular';
import {Config, Run, Inject} from '../../decorators/decorators'

class OnConfigTest {
  @Config()
  @Inject( '$provide', 'localStorageServiceProvider' )
  static configFactory( $provide, localStorageServiceProvider ) {
    const localStoragePrefix = 'employee-scheduling-test';

    // TODO: https://github.com/willmendesneto/keepr/blob/master/dist%2Fkeepr.js and http://willmendesneto.github.io/2014/10/28/creating-a-crud-in-a-single-angular-controller/ for crypto locale storage
    // enhance localStorageService
    $provide.decorator( 'localStorageService', ['$delegate', '$window', function ( $delegate, $window ) {
      $delegate.findLocalStorageItems = function ( query ) {
        query = new RegExp( `${localStoragePrefix}.${query.source}`, 'i' );
        let i, results = [];
        for ( i in $window.localStorage ) {
          if ( $window.localStorage.hasOwnProperty( i ) ) {
            if ( i.match( query ) || (!query && typeof i === 'string') ) {
              const value = JSON.parse( $window.localStorage.getItem( i ) );
              results.push( value );
            }
          }
        }
        return results;
      };

      return $delegate;
    }] );

    $provide.decorator( '$httpBackend', angular.mock.e2e.$httpBackendDecorator );
    // use "e-scheduling-test" as a localStorage name prefix so app doesn’t accidently read data from another app using the same variable names
    localStorageServiceProvider.setPrefix( localStoragePrefix );
  }
}

class OnRunTest {
  @Run()
  @Inject( '$httpBackend', 'localStorageService' )
  static runFactory( $httpBackend, localStorageService ) {
    $httpBackend.whenGET( /^\w+.*/ ).passThrough();
    $httpBackend.whenPOST( /^\w+.*/ ).passThrough();

    // clear all locale storage for employee-scheduling-test except 'user' and 'token' data
    localStorageService.clearAll( /^(?!user|token).+/ );
  }
}
