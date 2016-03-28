'use strict';

import {Service} from '../../decorators/decorators'

@Service( {
  serviceName: 'DocumentService'
} )
class DocumentService {
  grantAccess( selectedEmployees, employeesWithoutAccess, employeesWithAccess ) {
    if ( selectedEmployees.length > 0 ) {
      const selectedEmployeesTemp = employeesWithoutAccess
        .filter( ( employee ) => selectedEmployees.filter( ( emp ) => emp === employee.id ).length > 0 );

      selectedEmployeesTemp.forEach( ( employee ) => {
        const index = employeesWithoutAccess.findIndex( employeeWithoutAccess => employee.id === employeeWithoutAccess.id );
        employeesWithoutAccess.splice( index, 1 );
      } );

      selectedEmployees = [];
      return employeesWithAccess.concat( selectedEmployeesTemp );
    }
  }
}

export default DocumentService;
