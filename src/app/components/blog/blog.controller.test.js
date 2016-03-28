import home from './blog.module.js';

describe( 'Controller: Blog', function () {
  let $controller;

  beforeEach( angular.mock.module( home ) );

  beforeEach( angular.mock.inject( function ( _$controller_ ) {
    $controller = _$controller_;
  } ) );

  it( 'name is initialized to World', function () {
    let ctrl = $controller( 'BlogController' );
    expect( ctrl.name ).toBe( 'World' );
  } );
} );
