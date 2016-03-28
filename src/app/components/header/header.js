'use strict'

import template from './header.html'
import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'pps-header'
} )
@View( {
  template: template
} )
@Inject( '$state', 'AuthenticationService' )
class Header {
  constructor( $state, AuthenticationService ) {
    this.state = $state
    this.AuthenticationService = AuthenticationService
  }

  logout() {
    return this.AuthenticationService.logout().then( () => {
      this.state.go( 'auth.login' )
    } )
  }

}

export default Header
