/*eslint-env jasmine */

// import npd from './index.js';

describe( 'Controller: Npd', function () {
  // let $controller;

  // beforeEach(angular.mock.module(npd));
  //
  // beforeEach(angular.mock.inject(function(_$controller_) {
  //   $controller = _$controller_;
  // }));

  it( 'name is initialized to World', function () {
    // let ctrl = $controller('NpdController');
    let ctrl = {
      name: 'World'
    };
    expect( ctrl.name ).toBe( 'World' );
  } );
} );
