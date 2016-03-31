'use strict'

import {Directive, Inject} from '../../decorators/decorators'

// const NG_IF = new WeakMap()
// const AUTHENTICATION_SERVICE = new WeakMap()
@Directive( {
  selector: 'access-level'
} )
class MmAccessLevel {
  constructor( ngIfDirective, AuthenticationService ) {
    this.priority = ngIfDirective[0].priority
    this.terminal = ngIfDirective[0].terminal
    this.restrict = ngIfDirective[0].restrict
    this.transclude = ngIfDirective[0].transclude
    this.NG_IF = ngIfDirective[0]
    this.AUTHENTICATION_SERVICE = AuthenticationService
  }

  link( scope, element, attrs ) {
    let visibility = false, accessLevels

    attrs.$observe( 'mmAccessLevel', ( al ) => {
      if ( al ) {
        accessLevels = scope.$eval( al )
      }

      updateVisibility()
    } )

    function updateVisibility() {
      if ( accessLevels ) {
        visibility = this.AUTHENTICATION_SERVICE.isAuthorized( accessLevels )
        attrs.ngIf = () => visibility
      }
    }

    attrs.ngIf = () => visibility
    this.NG_IF.link.apply( this.NG_IF, arguments )
  }

  @Inject( 'ngIfDirective', 'AuthenticationService' )
  static directiveFactory( ngIfDirective, AuthenticationService ) {
    MmAccessLevel.instance = new MmAccessLevel( ngIfDirective, AuthenticationService )
    return MmAccessLevel.instance
  }
}

export default MmAccessLevel
