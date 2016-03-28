'use strict';

import {RouteConfig, Inject} from '../../../../../decorators/decorators'

@RouteConfig( 'app.settings.positions.edit', {
  url: '/:id/edit',
  onEnter: ['$stateParams', '$modal', 'ModalService', ( $stateParams, $modal, ModalService ) => {
    const id = $stateParams.id;
    $modal.open( {
      template: '<modal-position></modal-position>',
      controller: PositionEdit,
      controllerAs: 'vm',
      size: 'md',
      resolve: {
        init: ['PositionModel', ( PositionModel ) => PositionModel.initItem( id )]
      }
    } ).result.then( ModalService.onSuccess(), ModalService.onError( $modal, 'app.settings.positions' ) ).finally( ModalService.onFinal( 'app.settings.positions' ) );
  }]
} )
@Inject( '$modalInstance', 'ModalModel' )
class PositionEdit {
  constructor( $modalInstance, ModalModel ) {
    ModalModel.setItem( $modalInstance );
  }
}

export default PositionEdit;
