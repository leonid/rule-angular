'use strict'

import 'angular-mocks'
import './startswith.filter'

describe( 'Helpers: startsWith', () => {
  let nameStartsWithFilter

  beforeEach( angular.mock.module( 'pps' ) )

  beforeEach( inject( ( _nameStartsWithFilter_ ) => {
    nameStartsWithFilter = _nameStartsWithFilter_
  } ) )

  it( 'should test starts with desired letter filter with array data', () => {
    let list = [
      {
        id: '1',
        name: 'Judas'
      },
      {
        id: '2',
        name: 'Priest'
      }
    ]
    expect( nameStartsWithFilter( list, 'J' ) ).toEqual( list[1].name )
  } )

  it( 'should return empty string if position does not exist', () => {
    let list = [
      {
        id: '1',
        name: 'Judas'
      },
      {
        id: '2',
        name: 'Priest'
      }
    ]
    expect( nameStartsWithFilter( list, 'no-exist' ) ).toEqual( '' )
  } )
} )
