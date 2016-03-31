'use strict'

import 'angular-mocks'
import './position-label.js'

describe( 'Filters: positionLabel', () => {
  let positionLabelFilter, positions

  beforeEach( angular.mock.module( 'ngDecorator' ) )

  beforeEach( inject( ( _positionLabelFilter_ ) => {
    positionLabelFilter = _positionLabelFilter_
  } ) )

  it( 'should test position label filter with array data', () => {
    positions = [
      {
        id: '1',
        name: 'Junior Animator'
      },
      {
        id: '2',
        name: 'Senior Animator'
      }
    ]
    expect( positionLabelFilter( positions[1].id, positions ) ).toEqual( positions[1].name )
  } )

  it( 'should test position label filter with object data', () => {
    positions = {
      data: [
        {
          id: '1',
          name: 'Junior Animator'
        },
        {
          id: '2',
          name: 'Senior Animator'
        }
      ]
    }
    expect( positionLabelFilter( positions.data[1].id, positions ) ).toEqual( positions.data[1].name )
  } )

  it( 'should return empty string if position does not exist', () => {
    positions = {
      data: [
        {
          id: '1',
          name: 'Junior Animator'
        },
        {
          id: '2',
          name: 'Senior Animator'
        }
      ]
    }
    expect( positionLabelFilter( 'no-exist', positions ) ).toEqual( '' )
  } )
} )
