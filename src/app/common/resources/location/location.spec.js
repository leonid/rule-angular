'use strict';

import LocationResource from './location.js';

describe( 'LocationResource', () => {

  let locationResource, mockData = '$http', route = `locations`;

  beforeEach( () => {
    locationResource = new LocationResource( mockData );
  } );

  it( `should have 'http' property set to $http`, () => {
    expect( locationResource.http ).toEqual( mockData );
  } );

  it( `should have 'route' property set to '${route}'`, () => {
    expect( locationResource.route ).toEqual( route );
  } );
} );
