'use strict';

import MessageModel from './message.js';

describe( 'MessageModel', () => {

  let messageModel, mockObject = {test: 'test'};

  beforeEach( () => {
    messageModel = new MessageModel( mockObject );
  } );

  it( `should have 'resource' property set to MessageModel`, () => {
    expect( messageModel.resource ).toEqual( mockObject );
  } );
} );
