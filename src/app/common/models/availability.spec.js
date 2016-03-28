'use strict';

import AvailabilityModel from './availability.js';

describe( 'AvailabilityModel', () => {

  let availabilityModel, mockObject = {test: 'test'};

  beforeEach( () => {
    availabilityModel = new AvailabilityModel( mockObject );
  } );

  it( `should have 'resource' property set to AvailabilityModel`, () => {
    expect( availabilityModel.resource ).toEqual( mockObject );
  } );
} );
