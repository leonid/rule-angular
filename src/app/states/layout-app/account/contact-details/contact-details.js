'use strict';

import template from './contact-details.html'
import {RouteConfig, Component, View, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'app.account.contact-details', {
  url: '/contact-details',
  template: '<contact-details></contact-details>'
} )
@Component( {
  selector: 'contact-details'
} )
@View( {
  template: template
} )
@Inject( 'EmployeeModel', 'FormService', 'EmployeeResource' )
class ContactDetails {
  constructor( EmployeeModel, FormService, EmployeeResource ) {
    this.employee = EmployeeModel.getItem();
    this.result = null;
    this.isSubmitting = null;
    this.FormService = FormService;
    this.EmployeeModel = EmployeeModel;
    this.EmployeeResource = EmployeeResource;
    this.saveButtonOptions = FormService.getSaveButtonOptions();
    this.EmployeeModel.calculateProfileCompleteness();
  }

  save( form ) {
    if ( !form.$valid ) {
      return;
    }

    this.isSubmitting = true;
    return this.EmployeeResource.updateAccountDetails( this.employee ).then( data => {
      this.employee.cas = data.cas;
      this.EmployeeModel.calculateProfileCompleteness();
      form.$setPristine();
      this.FormService.onSuccess( this );
    }, response => {
      form.$setPristine();
      this.FormService.onFailure( this, response );
    } );
  }
}

export default ContactDetails;
