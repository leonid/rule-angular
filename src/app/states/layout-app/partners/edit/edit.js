'use strict';

import {RouteConfig, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'app.partners.edit', {
  url: '/:id/edit',
  onEnter: ['$stateParams', '$modal', 'ModalService', ( $stateParams, $modal, ModalService ) => {
    const id = $stateParams.id;
    $modal.open( {
      template: '<modal-partner></modal-partner>',
      controller: PartnerEdit,
      controllerAs: 'vm',
      size: 'md',
      resolve: {
        init: ['PartnerModel', ( PartnerModel ) => PartnerModel.initItem( id )]
      }
    } ).result.then( ModalService.onSuccess(), ModalService.onError( $modal, 'app.partners' ) ).finally( ModalService.onFinal( 'app.partners' ) );
  }]
} )
@Inject( '$modalInstance', 'ModalModel' )
class PartnerEdit {
  constructor( $modalInstance, ModalModel ) {
    ModalModel.setItem( $modalInstance );
  }
}

export default PartnerEdit;
