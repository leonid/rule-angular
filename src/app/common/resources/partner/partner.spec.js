'use strict';

import PartnerResource from './partner.js';

describe( 'PartnerResource', () => {

  let partnerResource, mockData = '$http', route = `partners`;

  beforeEach( () => {
    partnerResource = new PartnerResource( mockData );
  } );

  it( `should have 'http' property set to $http`, () => {
    expect( partnerResource.http ).toEqual( mockData );
  } );

  it( `should have 'route' property set to '${route}'`, () => {
    expect( partnerResource.route ).toEqual( route );
  } );
} );
