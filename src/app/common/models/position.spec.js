'use strict';

import PositionModel from './position.js';

describe( 'PositionModel', () => {

  let positionModel, mockObject = {test: 'test'};

  beforeEach( () => {
    positionModel = new PositionModel( mockObject );
  } );

  it( `should have 'resource' property set to PositionModel`, () => {
    expect( positionModel.resource ).toEqual( mockObject );
  } );
} );
