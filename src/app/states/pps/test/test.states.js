import template  from './test.html';

export default function routing( $stateProvider ) {
  /*@ngInject*/

  $stateProvider
    .state( 'pps.test', {
      url: '/test',
      controller: 'TestController',
      controllerAs: 'vm',
      template: template
    } )

}

routing.$inject = ['$stateProvider']
