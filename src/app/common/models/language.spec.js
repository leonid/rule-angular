'use strict';

import LanguageModel from './language.js';

describe( 'LanguageModel', () => {

  let languageModel, mockObject = {test: 'test'};

  beforeEach( () => {
    languageModel = new LanguageModel( mockObject );
  } );

  it( `should have 'resource' property set to LanguageModel`, () => {
    expect( languageModel.resource ).toEqual( mockObject );
  } );
} );
