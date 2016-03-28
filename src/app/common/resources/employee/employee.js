'use strict';

// import './employee.mock.js#?ENV|mock';
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../decorators/decorators'

@Service( {
  serviceName: 'EmployeeResource'
} )
@Inject( '$http' )
class EmployeeResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'employees' );
  }

  getEmployeeByEmail( email ) {
    return this.http.get( `/${this.route}/${email}/unique` );
  }

  getAccountDetails( id ) {
    return this.http.get( `/${this.route}/${id}/account` );
  }

  updateAccountDetails( updatedResource ) {
    return this.http.put( `/${this.route}/${updatedResource.id}/account`, updatedResource );
  }
}

export default EmployeeResource;
