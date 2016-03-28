/* eslint-env jasmine */
'use strict'

import './complete.js'

describe( 'ResourceAddComplete', () => {

  beforeEach( angular.mock.module( 'pps' ) )

  describe( 'Route', () => {
    let url = `/resources/add/complete`,
      state = 'pps.resources.add.complete',
      currentState, $state

    beforeEach( inject( ( _$state_ ) => {
      $state = _$state_

      $state.go( state )
      currentState = $state.get( state )
    } ) )

    it( `should respond to '${url}' URL`, () => {
      expect( $state.href( state ) ).toEqual( url )
    } )

    it( 'should have component named `resource-complete`', () => {
      expect( currentState.views['modal@'].template ).toBeDefined()
    } )
  } )
} )
