import TestService from './test.service.js';

describe( 'Test', function () {
  describe( 'Service', function () {
    it( 'should say hello', function () {
      var testService = new TestService();
      var hello = testService.sayHello();
      expect( hello ).toBe( 'hello' );
    } );
  } );
} );
