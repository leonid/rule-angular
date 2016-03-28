'use strict';

import template from './header.html'
import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'header'
} )
@View( {
  template: template
} )
@Inject( '$state', 'AuthenticationService' )
class Header {
  constructor( $state, AuthenticationService ) {
    this.router = $state;
    this.AuthenticationService = AuthenticationService;
  }

  logout() {
    return this.AuthenticationService.logout().then( () => {
      this.router.go( 'auth.login' );
    } );
  }
}

export default Header;
