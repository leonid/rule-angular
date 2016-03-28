'use strict';

import {ACCESS_LEVELS} from '../../common/constants/constants';
import './layout-auth.js';

describe( 'AuthRoute', () => {
  let $state,
    url = '',
    state = 'auth',
    currentState;

  beforeEach( angular.mock.module( 'ngDecorator' ) );

  beforeEach( inject( ( _$state_ ) => {
    $state = _$state_;

    currentState = $state.get( state );
  } ) );

  it( `should respond to '${url}' URL`, () => {
    expect( $state.href( state ) ).toEqual( url );
  } );

  it( 'should have $state abstract set to `true`', () => {
    expect( currentState.abstract ).toEqual( true );
  } );

  it( 'should have template to be defined', () => {
    expect( currentState.template.trim() ).toEqual( '<div ui-view></div>' );
  } );

  it( `should have access level set to '${ACCESS_LEVELS.public}'`, () => {
    expect( currentState.data.access ).toEqual( ACCESS_LEVELS.public );
  } );
} );
