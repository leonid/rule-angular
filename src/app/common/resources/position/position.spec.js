'use strict';

import PositionResource from './position.js';

describe( 'PositionResource', () => {

  let positionResource, mockData = '$http', route = `positions`;

  beforeEach( () => {
    positionResource = new PositionResource( mockData );
  } );

  it( `should have 'http' property set to $http`, () => {
    expect( positionResource.http ).toEqual( mockData );
  } );

  it( `should have 'route' property set to '${route}'`, () => {
    expect( positionResource.route ).toEqual( route );
  } );
} );
