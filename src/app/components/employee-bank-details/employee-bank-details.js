'use strict';

import template from './employee-bank-details.html'
import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'employee-bank-details'
} )
@View( {
  template: template
} )
@Inject( 'EmployeeModel' )
class EmployeeBankDetails {
  constructor( EmployeeModel ) {
    this.employee = EmployeeModel.getItem();
  }
}

export default EmployeeBankDetails;
