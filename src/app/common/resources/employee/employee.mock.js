'use strict';

import employee from './fixtures/employee_1.json'
import employees from './fixtures/employees.json'
import AbstractResourceMock from '../abstract-resource-mock';
import {Run, Inject} from '../../../decorators/decorators'

class EmployeeResourceMock extends AbstractResourceMock {
  @Run()
  @Inject( '$httpBackend', 'localStorageService' )
  runFactory( $httpBackend, localStorageService ) {
    $httpBackend.whenGET( /\/employees\/([^&]*)\/unique/ )
      .respond( ( method, url ) => {
        console.log( 'GET', url );
        const email = url.match( /\/employees\/([^&]*)\/unique/ )[1];
        const dataListLocal = localStorageService.findLocalStorageItems( new RegExp( `employee_(\\d+|[a-z]*)` ) );
        const dataLocal = dataListLocal.find( ( employee ) => employee.email === email );

        if ( !dataLocal ) {
          return [404];
        }

        return [200, dataLocal];
      } );

    super.init( $httpBackend, localStorageService, 'employees', employee, employees, 'firstName' );
  }
}
