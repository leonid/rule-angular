'use strict';

import template from './forgot-password.html'
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'auth.forgot-password', {
  url: '/forgot-password',
  template: '<forgot-password></forgot-password>'
} )
@Component( {
  selector: 'forgot-password'
} )
@View( {
  template: template
} )
@Inject( 'AuthenticationResource', 'FormService' )
class ForgotPassword {
  constructor( AuthenticationResource, FormService ) {
    this.result = null;
    this.isSubmitting = null;
    this.copyrightDate = new Date();
    this.saveButtonOptions = Object.assign( {}, FormService.getModalSaveButtonOptions() );
    this.saveButtonOptions.buttonDefaultText = 'Reset password';
    this.saveButtonOptions.buttonSubmittingText = 'Resetting password';
    this.saveButtonOptions.buttonSuccessText = 'Reset password';
    this.AuthenticationResource = AuthenticationResource;
    this.FormService = FormService;
  }

  resetPassword( isFormValid, form ) {
    if ( !isFormValid ) {
      return;
    }

    this.isSubmitting = true;
    return this.AuthenticationResource.forgotPassword( this.email ).then( () => {
      this.email = '';
      form.$setPristine();
      this.FormService.onSuccess( this );
      this.hasSuccess = true;
      this.successMessage = 'We have emailed you instructions on how to reset your password. Please check your inbox.';
    }, ( response ) => {
      this.hasSuccess = false;
      form.$setPristine();
      this.FormService.onFailure( this, response );
      if ( response.status === 404 ) {
        this.errorMessage = 'This email address was not found in our records';
      }
    } );
  }
}

export default ForgotPassword;
