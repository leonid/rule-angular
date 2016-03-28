'use strict';

// import './authentication.mock.js#?ENV|mock';
import {Service, Inject} from '../../../decorators/decorators'

if ( NODE_ENV === 'test' ) {
  require( './authentication.mock.js' )
}

@Service( {
  serviceName: 'AuthenticationResource'
} )
@Inject( '$http', '$window' )
class AuthenticationResource {
  constructor( $http, $window ) {
    this.http = $http;
    this.route = 'auth';
    this.$window = $window;
  }

  login( credentials ) {
    const encoded = this.$window.btoa( JSON.stringify( credentials ) );
    return this.http.post( `/${this.route}/login`, {credentials: encoded} );
  }

  logout() {
    return this.http.get( `/${this.route}/logout` );
  }

  forgotPassword( email ) {
    return this.http.post( `/${this.route}/forgot`, {email: email} );
  }

  resetPassword( credentials, token ) {
    const encoded = this.$window.btoa( JSON.stringify( credentials ) );
    return this.http.post( `/${this.route}/password/${token}`, {credentials: encoded} );
  }

  updatePassword( credentials, id ) {
    const encoded = this.$window.btoa( JSON.stringify( credentials ) );
    return this.http.put( `/${this.route}/password/${id}`, {credentials: encoded} );
  }
}

export default AuthenticationResource;
