/* eslint-env jasmine */
import TestController from './test.controller.js';
import TestService from './test.service.js';

describe( 'Test', function () {
  describe( 'Controller', function () {
    it( 'should say hello', function () {

      let testService = new TestService();
      spyOn( testService, 'sayHello' ).and.callFake( () => {
        return 'mockHello';
      } );

      let testController = new TestController( testService );
      testController.sayHello();

      // expect(testController.hi).toBe('hello');

      // expect(testController.hello).toBe('mockHello');
    } );
  } );
} );
