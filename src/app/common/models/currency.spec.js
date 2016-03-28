'use strict';

import CurrencyModel from './currency.js';

describe( 'CurrencyModel', () => {

  let currencyModel, mockObject = {test: 'test'};

  beforeEach( () => {
    currencyModel = new CurrencyModel( mockObject );
  } );

  it( `should have 'resource' property set to CurrencyModel`, () => {
    expect( currencyModel.resource ).toEqual( mockObject );
  } );
} );
