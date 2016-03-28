'use strict';

import {RouteConfig, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'app.employees.message', {
  url: '/:id/message',
  onEnter: ['$stateParams', '$modal', 'ModalService', ( $stateParams, $modal, ModalService ) => {
    const id = $stateParams.id;
    $modal.open( {
      template: '<modal-message></modal-message>',
      controller: EmployeeMessage,
      controllerAs: 'vm',
      size: 'md',
      resolve: {
        init: ['EmployeeModel', EmployeeModel => EmployeeModel.initItem( id )]
      }
    } ).result.then( ModalService.onSuccess(), ModalService.onError( $modal, 'app.employees' ) ).finally( ModalService.onFinal( 'app.employees' ) );
  }]
} )
@Inject( '$modalInstance', 'ModalModel' )
class EmployeeMessage {
  constructor( $modalInstance, ModalModel ) {
    ModalModel.setItem( $modalInstance );
  }
}

export default EmployeeMessage;
