import testDirective from './test.directive'
import TestController from './test.controller'
import TestService from './test.service'
import testStates from './test.states'

export default angular.module( 'pps.test', [] )
  .config( testStates )
  .directive( 'testDirective', testDirective )
  .controller( 'TestController', TestController )
  .service( 'TestService', TestService )
  .name

