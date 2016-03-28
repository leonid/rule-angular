'use strict';

import template from './employee-hourly-rate.html'
import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'employee-hourly-rate'
} )
@View( {
  template: template
} )
@Inject( 'EmployeeModel', 'SettingModel' )
class EmployeeHourlyRate {
  constructor( EmployeeModel, SettingModel ) {
    this.employee = EmployeeModel.getItem();
    this.employee.currencyCode = this.employee.currencyCode || SettingModel.getItem().currencyCode;
    this.employee.currencySymbol = this.employee.currencySymbol || SettingModel.getItem().currencySymbol;
  }
}

export default EmployeeHourlyRate;
