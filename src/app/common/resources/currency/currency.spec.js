'use strict';

import CurrencyResource from './currency.js';

describe( 'CurrencyResource', () => {

  let currencyResource, mockData = '$http', route = `currencies`;

  beforeEach( () => {
    currencyResource = new CurrencyResource( mockData );
  } );

  it( `should have 'http' property set to $http`, () => {
    expect( currencyResource.http ).toEqual( mockData );
  } );

  it( `should have 'route' property set to '${route}'`, () => {
    expect( currencyResource.route ).toEqual( route );
  } );
} );
