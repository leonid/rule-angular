class TestController {
  /*@ngInject*/

  constructor( TestService ) {
    this.TestService = TestService;
  }

  sayHello() {
    this.hello = 'hello';
    this.hi = this.TestService.sayHello();
  }
}

TestController.$inject = ['TestService']

export default TestController;
