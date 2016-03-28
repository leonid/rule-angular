'use strict';

import LocationModel from './location.js';

describe( 'LocationModel', () => {

  let locationModel, mockObject = {test: 'test'}, mockCollection = [{
    id: '1',
    default: false
  }, {id: '2', default: true}];

  beforeEach( () => {
    locationModel = new LocationModel( mockObject );
  } );

  it( `should have 'resource' property set to LocationModel`, () => {
    expect( locationModel.resource ).toEqual( mockObject );
  } );

  it( `should get default location`, () => {
    locationModel.setCollection( mockCollection );
    expect( locationModel.getDefaultLocation() ).toEqual( mockCollection[1] );
  } );
} );
