'use strict';

import {RouteConfig, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'app.partners.add', {
  url: '/add',
  onEnter: ['$modal', 'ModalService', ( $modal, ModalService ) => {
    $modal.open( {
      template: '<modal-partner></modal-partner>',
      controller: PartnerAdd,
      controllerAs: 'vm',
      size: 'md',
      resolve: {
        init: ['PartnerModel', ( PartnerModel ) => PartnerModel.initItem()]
      }
    } ).result.finally( ModalService.onFinal( 'app.partners' ) );
  }]
} )
@Inject( '$modalInstance', 'ModalModel' )
class PartnerAdd {
  constructor( $modalInstance, ModalModel ) {
    ModalModel.setItem( $modalInstance );
  }
}

export default PartnerAdd;
