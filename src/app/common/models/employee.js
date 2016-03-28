'use strict';

import AbstractModel from './abstract-model';
import {PROFILE_COMPLETENESS_TYPES} from '../../common/constants/constants';
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'EmployeeModel'
} )
@Inject( 'EmployeeResource' )
class EmployeeModel extends AbstractModel {
  constructor( EmployeeResource ) {
    super( EmployeeResource );
    this.profileCompleteness = {}; // use two-way scope binding
  }

  getProfileCompleteness() {
    return this.profileCompleteness;
  }

  emptyObjectPropertiesCounter( object, completenessFields ) {
    let i = 0;
    for ( let key of completenessFields ) {
      if ( !object.hasOwnProperty( key ) || (object.hasOwnProperty( key ) && !object[key]) ) {
        i++;
      }
    }

    return i;
  }

  // there are three places in app where profile completeness can be calculated 'account profile page', 'edit employee', 'add employee'
  calculateProfileCompleteness( type = PROFILE_COMPLETENESS_TYPES.ACCOUNT ) {
    const employee = super.getItem();

    // Profile Account page has only 4 fields that are needs for calculation completeness (only contacts fields in this case)
    const completenessFields = type === PROFILE_COMPLETENESS_TYPES.ACCOUNT ? ['phoneNumber', 'address', 'city', 'zipCode'] : ['firstName', 'lastName', 'email', 'position', 'hourlyRate', 'personalNo', 'identityNo', 'bankName', 'accountNumber', 'accountName', 'phoneNumber', 'address', 'city', 'zipCode'];
    const totalObjectProperties = type === PROFILE_COMPLETENESS_TYPES.ACCOUNT ? 8 : 14;
    const totalEmptyObjectProperties = this.emptyObjectPropertiesCounter( employee, completenessFields );

    this.profileCompleteness.percentage = (((totalObjectProperties - totalEmptyObjectProperties) * 100) / totalObjectProperties).toFixed( 0 );

    return this.profileCompleteness;
  }
}

export default EmployeeModel;
