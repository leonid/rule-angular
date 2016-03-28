'use strict';

import MessageResource from './message.js';

describe( 'MessageResource', () => {

  let messageResource, mockData = '$http', route = `emails`;

  beforeEach( () => {
    messageResource = new MessageResource( mockData );
  } );

  it( `should have 'http' property set to $http`, () => {
    expect( messageResource.http ).toEqual( mockData );
  } );

  it( `should have 'route' property set to '${route}'`, () => {
    expect( messageResource.route ).toEqual( route );
  } );
} );
