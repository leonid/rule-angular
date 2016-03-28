'use strict';

import template from './employee-authorizations.html'
import {EMPLOYEE_PROFILE_STATUSES, USER_ROLES} from '../../common/constants/constants';
import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'employee-authorizations'
} )
@View( {
  template: template
} )
@Inject( 'EmployeeModel', 'LocationModel' )
class EmployeeAuthorizations {
  constructor( EmployeeModel, LocationModel ) {
    this.roles = Object.values( USER_ROLES );
    this.employee = EmployeeModel.getItem();
    this.locations = LocationModel.getCollection().filter( location => location.status === EMPLOYEE_PROFILE_STATUSES.ACTIVE );
    this.employee.role = this.employee.role || USER_ROLES.EMPLOYEE;
    this.employee.locations = this.employee.locations || [this.locations.find( location => location.default ).id];
    this.employee.supervisorLocations = this.employee.supervisorLocations || [];
  }

  deleteSupervisorLocations() {
    if ( this.employee.role !== USER_ROLES.SUPERVISOR ) {
      this.employee.supervisorLocations = [];
    }
  }

  selectAll( selectedAll, type ) {
    if ( selectedAll ) {
      this.employee[type] = this.locations.map( location => location.id );
    } else {
      this.employee[type] = [];
    }
  }

  toggleSelection( locationId, selectedAll, type ) {
    const idx = this.employee[type].indexOf( locationId );

    // is currently selected
    if ( idx > -1 ) {
      this.employee[type].splice( idx, 1 );
    } else { // is newly selected
      this.employee[type].push( locationId );
    }

    selectedAll = this.employee[type].length === this.locations.length;
  }
}

export default EmployeeAuthorizations;
