'use strict';

import SettingResource from './setting.js';

describe( 'SettingResource', () => {

  let settingResource, mockData = '$http', route = `settings`;

  beforeEach( () => {
    settingResource = new SettingResource( mockData );
  } );

  it( `should have 'http' property set to $http`, () => {
    expect( settingResource.http ).toEqual( mockData );
  } );

  it( `should have 'route' property set to '${route}'`, () => {
    expect( settingResource.route ).toEqual( route );
  } );
} );
