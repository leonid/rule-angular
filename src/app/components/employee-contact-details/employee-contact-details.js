'use strict';

import template from './employee-contact-details.html'
import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'employee-contact-details'
} )
@View( {
  template: template
} )
@Inject( 'EmployeeModel' )
class EmployeeContactDetails {
  constructor( EmployeeModel ) {
    this.employee = EmployeeModel.getItem();
  }
}

export default EmployeeContactDetails;
