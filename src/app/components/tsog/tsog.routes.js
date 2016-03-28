import tsogTemplate  from './tsog.reestr.html';
import tsogFormularTemplate  from './tsog.formular.html';

export default function routing( $stateProvider ) {

  $stateProvider
    .state( 'tsog', {
      url: '/tsog',
      views: {
        'list': {
          template: tsogTemplate,
          controller: 'TsogController',
          controllerAs: 'tsog'
        }
      }

    } )
    .state( 'formular', {
      url: '/form',
      views: {
        'list': {
          template: tsogFormularTemplate,
          controller: 'TsogController',
          controllerAs: 'tsog'
        }
      }
    } );

}

routing.$inject = ['$stateProvider'];
