'use strict'

import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'AuthenticationService'
} )
@Inject( 'AuthenticationResource', 'TokenModel' )
class AuthenticationService {
  constructor( AuthenticationResource, TokenModel ) {
    this.TokenModel = TokenModel
    this.AuthenticationResource = AuthenticationResource
  }

  login( credentials ) {
    return this.AuthenticationResource.login( credentials ).then( ( response ) => {
      this.TokenModel.set( response.token )
    } )
  }

  logout() {
    return this.AuthenticationResource.logout().then( () => {
      this.TokenModel.remove()
    } )
  }

  isAuthorized( accessLevels ) {
    if ( accessLevels.indexOf( '*' ) !== -1 ) {
      return true
    }
    
    return (this.isAuthenticated() && accessLevels.indexOf( this.getCurrentUser().role ) !== -1)
  }

  isAuthenticated() {
    return !!this.TokenModel.get()
  }

  getCurrentUser() {
    return this.TokenModel.getCurrentUser()
  }
}

export default AuthenticationService
