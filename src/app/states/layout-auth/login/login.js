'use strict';

import template from './login.html'
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'auth.login', {
  url: '/',
  template: '<login></login>'
} )
@Component( {
  selector: 'login'
} )
@View( {
  template: template
} )
@Inject( '$rootScope', '$state', 'AuthenticationService', 'FormService' )
class Login {
  constructor( $rootScope, $state, AuthenticationService, FormService ) {
    this.$rootScope = $rootScope;
    this.router = $state;
    this.result = null;
    this.isSubmitting = null;
    this.copyrightDate = new Date();
    this.saveButtonOptions = Object.assign( {}, FormService.getModalSaveButtonOptions() );
    this.saveButtonOptions.buttonDefaultText = 'Sign me in';
    this.saveButtonOptions.buttonSubmittingText = 'Signing me in';
    this.saveButtonOptions.buttonSuccessText = 'Signed me in';
    this.AuthenticationService = AuthenticationService;
    this.FormService = FormService;
  }

  login( isFormValid, form ) {
    if ( !isFormValid ) {
      return;
    }

    this.isSubmitting = true;
    return this.AuthenticationService.login( this.credentials ).then( () => {
      this.$rootScope.currentUser = this.AuthenticationService.getCurrentUser();
      this.FormService.onSuccess( this );
      this.router.go( 'app.schedule' );
    }, ( response ) => {
      form.$setPristine();
      this.FormService.onFailure( this, response );
    } );
  }
}

export default Login;
