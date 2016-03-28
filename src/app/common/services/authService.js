/** Class representing a way to authentificate. */
import angular from 'angular';

class AuthService {
  constructor( $q, $timeout, $http ) {
    var user = null;

  }

  getUser() {

  }

  isLoggedIn() {
    if ( user ) {
      return true;
    } else {
      return false;
    }
  }

  getUserStatus() {
    return user;
  }

  login( username, password ) {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post( '/user/login', {username: username, password: password} )
      // handle success
      .success( function ( data, status ) {
        if ( status === 200 && data.status ) {
          user = true;
          deferred.resolve();
        } else {
          user = false;
          deferred.reject();
        }
      } )
      // handle error
      .error( function ( data ) {
        user = false;
        deferred.reject();
      } );

    // return promise object
    return deferred.promise;

  }

  logout() {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a get request to the server
    $http.get( '/user/logout' )
      // handle success
      .success( function ( data ) {
        user = false;
        deferred.resolve();
      } )
      // handle error
      .error( function ( data ) {
        user = false;
        deferred.reject();
      } );

    // return promise object
    return deferred.promise;

  }

  register( username, password ) {

    // create a new instance of deferred
    var deferred = $q.defer();

    // send a post request to the server
    $http.post( '/user/register', {username: username, password: password} )
      // handle success
      .success( function ( data, status ) {
        if ( status === 200 && data.status ) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      } )
      // handle error
      .error( function ( data ) {
        deferred.reject();
      } );

    // return promise object
    return deferred.promise;

  }


  userFactory() {
    // return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });
  }
}

export default angular.module( 'service.auth', [] )
  .service( 'auth', AuthService )
  .name