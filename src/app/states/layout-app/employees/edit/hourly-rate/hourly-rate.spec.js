'use strict';

import 'angular-mocks';
import './hourly-rate.js';

describe( 'EmployeeEditHourlyRate', () => {

  beforeEach( angular.mock.module( 'ngDecorator' ) );

  describe( 'Route', () => {
    let id = '1',
      url = `/employees/${id}/edit/hourly-rate`,
      state = 'app.employees.edit.hourly-rate',
      component = '<employee-hourly-rate></employee-hourly-rate>',
      currentState, $state;

    beforeEach( inject( ( _$state_ ) => {
      $state = _$state_;

      $state.go( state, {id: id} );
      currentState = $state.get( state );
    } ) );

    it( `should respond to '${url}' URL`, () => {
      expect( $state.href( state, {id: id} ) ).toEqual( url );
    } );

    it( 'should have component named `employee-hourly-rate`', () => {
      expect( currentState.views['modal@'].template ).toEqual( component );
    } );
  } );
} );
