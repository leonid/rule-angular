import npdTemplate  from './view/blog.html'
import npdFormularTemplate from './view/npd.formular.html'

export default function routing( $stateProvider ) {

  $stateProvider.state( 'npd', {
    url: '/npd?:catalogId?:documentId',
    views: {
      list: {
        controller: 'NpdController',
        controllerAs: 'npd',
        template: npdTemplate,
      },
      formular: {
        controller: 'NpdController',
        controllerAs: 'npd',
        template: npdFormularTemplate,
      }
    }
  } )

}

routing.$inject = ['$stateProvider']
