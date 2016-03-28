'use strict';

import {RouteConfig, Inject} from '../../../../../decorators/decorators'

@RouteConfig( 'app.settings.locations.add', {
  url: '/add',
  onEnter: ['$modal', 'ModalService', ( $modal, ModalService ) => {
    $modal.open( {
      template: '<modal-location></modal-location>',
      controller: LocationAdd,
      controllerAs: 'vm',
      size: 'md',
      resolve: {
        init: ['LocationModel', ( LocationModel ) => LocationModel.initItem()]
      }
    } ).result.finally( ModalService.onFinal( 'app.settings.locations' ) );
  }]
} )
@Inject( '$modalInstance', 'ModalModel' )
class LocationAdd {
  constructor( $modalInstance, ModalModel ) {
    ModalModel.setItem( $modalInstance );
  }
}

export default LocationAdd;
