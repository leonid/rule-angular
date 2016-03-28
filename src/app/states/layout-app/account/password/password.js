'use strict';

import template from './password.html'
import {RouteConfig, Component, View, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'app.account.password', {
  url: '/password',
  template: '<password-details></password-details>'
} )
@Component( {
  selector: 'password-details'
} )
@View( {
  template: template
} )
@Inject( 'EmployeeModel', 'FormService', 'AuthenticationResource' )
class Password {
  constructor( EmployeeModel, FormService, AuthenticationResource ) {
    this.employee = EmployeeModel.getItem();
    this.result = null;
    this.isSubmitting = null;
    this.FormService = FormService;
    this.EmployeeModel = EmployeeModel;
    this.saveButtonOptions = FormService.getModalSaveButtonOptions();
    this.AuthenticationResource = AuthenticationResource;
    this.EmployeeModel.calculateProfileCompleteness();
  }

  save( form ) {
    if ( !form.$valid ) {
      return;
    }

    this.isSubmitting = true;
    return this.AuthenticationResource.updatePassword( this.passwords, this.employee.id ).then( () => {
      this.passwords = {};
      form.$setPristine();
      this.FormService.onSuccess( this );
      this.hasSuccess = true;
      this.successMessage = 'Your password has been changed successfully.';
    }, ( response ) => {
      form.$setPristine();
      this.hasSuccess = false;
      this.FormService.onFailure( this, response );
    } );
  }
}

export default Password;
