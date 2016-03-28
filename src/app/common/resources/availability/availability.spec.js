'use strict';

import AvailabilityResource from './availability.js';

describe( 'AvailabilityResource', () => {

  let availabilityResource, mockData = '$http', route = `availabilities`;

  beforeEach( () => {
    availabilityResource = new AvailabilityResource( mockData );
  } );

  it( `should have 'http' property set to $http`, () => {
    expect( availabilityResource.http ).toEqual( mockData );
  } );

  it( `should have 'route' property set to '${route}'`, () => {
    expect( availabilityResource.route ).toEqual( route );
  } );
} );
