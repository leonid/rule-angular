import npdTemplate  from './npd.html';
import npdFormularTemplate from './npd.formular.html';

export default function routing( $stateProvider ) {
  /*@ngInject*/

  $stateProvider
    .state( 'pps.npd', {
      url: '/npd',
      controller: 'NpdController',
      controllerAs: 'npd',
      template: npdTemplate
    } )
    .state( 'pps.npd.doc', {
      url: '/npd?:catalogId?:documentId',
      controller: 'NpdController',
      controllerAs: 'npd',
      template: npdFormularTemplate
    } )

}

routing.$inject = ['$stateProvider']
