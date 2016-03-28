/* eslint-env jasmine */
'use strict'

import './pps.states'

describe( 'AppRoute', () => {
  let $state,
    url = '',
    state = 'pps',
    currentState, $injector, SettingModel

  beforeEach( angular.mock.module( 'pps' ) )

  beforeEach( inject( ( _$state_, _$injector_, _SettingModel_ ) => {
    $state = _$state_
    $injector = _$injector_
    SettingModel = _SettingModel_

    currentState = $state.get( state )
  } ) )

  it( `should respond to '${url}' URL`, () => {
    expect( $state.href( state ) ).toEqual( url )
  } )

  it( 'should have $state abstract set to `true`', () => {
    expect( currentState.abstract ).toEqual( true )
  } )

  it( 'should have template to be defined', () => {
    expect( currentState.template ).toBeDefined()
  } )

  it( `should resolve 'init' for '${url}' state`, () => {
    spyOn( SettingModel, 'initItem' )

    $injector.invoke( currentState.resolve.init )

    expect( SettingModel.initItem ).toHaveBeenCalledWith( 'pps', null, true )
  } )
} )
