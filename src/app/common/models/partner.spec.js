'use strict';

import PartnerModel from './partner.js';

describe( 'PartnerModel', () => {

  let partnerModel, mockObject = {test: 'test'};

  beforeEach( () => {
    partnerModel = new PartnerModel( mockObject );
  } );

  it( `should have 'resource' property set to PartnerModel`, () => {
    expect( partnerModel.resource ).toEqual( mockObject );
  } );
} );
