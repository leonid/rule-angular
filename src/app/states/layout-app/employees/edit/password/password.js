'use strict';

import {ACCESS_LEVELS} from '../../../../../common/constants/constants';
import template from './password.html'
import {RouteConfig, Component, View, Inject} from '../../../../../decorators/decorators'

@RouteConfig( 'app.employees.edit.password', {
  url: '/password',
  views: {
    'modal@': {
      template: '<password></password>'
    }
  },
  data: {
    access: ACCESS_LEVELS.admin
  }
} )
@Component( {
  selector: 'password'
} )
@View( {
  template: template
} )
@Inject( 'EmployeeModel', 'AuthenticationResource', 'FormService' )
class EmployeeEditPassword {
  constructor( EmployeeModel, AuthenticationResource, FormService ) {
    this.employee = EmployeeModel.getItem();
    this.isSubmitting = null;
    this.AuthenticationResource = AuthenticationResource;
    this.FormService = FormService;
  }

  resetPassword() {
    this.isSubmitting = true;
    return this.AuthenticationResource.forgotPassword( this.employee.email ).then( () => {
      this.FormService.onSuccess( this );
      this.hasSuccess = true;
      this.successMessage = 'We have emailed instructions to this user on how to reset their password.';
    }, ( response ) => {
      this.hasSuccess = false;
      this.FormService.onFailure( this, response );
    } );
  }
}

export default EmployeeEditPassword;
