'use strict';

import 'angular-mocks';
import './bank-details.js';

describe( 'EmployeeAddBankDetails', () => {

  beforeEach( angular.mock.module( 'ngDecorator' ) );

  describe( 'Route', () => {
    let url = `/employees/add/bank-details`,
      state = 'app.employees.add.bank-details',
      component = '<employee-bank-details></employee-bank-details>',
      currentState, $state;

    beforeEach( inject( ( _$state_ ) => {
      $state = _$state_;

      $state.go( state );
      currentState = $state.get( state );
    } ) );

    it( `should respond to '${url}' URL`, () => {
      expect( $state.href( state ) ).toEqual( url );
    } );

    it( 'should have component named `employee-bank-details`', () => {
      expect( currentState.views['modal@'].template ).toEqual( component );
    } );
  } );
} );
