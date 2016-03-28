'use strict';

import {RouteConfig, Inject} from '../../../../../decorators/decorators'

@RouteConfig( 'app.settings.positions.add', {
  url: '/add',
  onEnter: ['$modal', 'ModalService', ( $modal, ModalService ) => {
    $modal.open( {
      template: '<modal-position></modal-position>',
      controller: PositionAdd,
      controllerAs: 'vm',
      size: 'md',
      resolve: {
        init: ['PositionModel', ( PositionModel ) => PositionModel.initItem()]
      }
    } ).result.finally( ModalService.onFinal( 'app.settings.positions' ) );
  }]
} )
@Inject( '$modalInstance', 'ModalModel' )
class PositionAdd {
  constructor( $modalInstance, ModalModel ) {
    ModalModel.setItem( $modalInstance );
  }
}

export default PositionAdd;
