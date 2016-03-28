'use strict';

import SettingModel from './setting.js';

describe( 'SettingModel', () => {

  let settingModel, mockObject = {test: 'test'};

  beforeEach( () => {
    settingModel = new SettingModel( mockObject );
  } );

  it( `should have 'resource' property set to SettingModel`, () => {
    expect( settingModel.resource ).toEqual( mockObject );
  } );
} );
