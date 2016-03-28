'use strict';

import ModalModel from './modal.js';

describe( 'ModalModel', () => {

  let modalModel;

  beforeEach( () => {
    modalModel = new ModalModel();
  } );

  it( `should have model defined`, () => {
    expect( modalModel ).toBeDefined();
  } );
} );

