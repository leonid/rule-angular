'use strict';

import {RouteConfig, Inject} from '../../../../../decorators/decorators'

@RouteConfig( 'app.settings.locations.edit', {
  url: '/:id/edit',
  onEnter: ['$stateParams', '$modal', 'ModalService', ( $stateParams, $modal, ModalService ) => {
    const id = $stateParams.id;
    $modal.open( {
      template: '<modal-location></modal-location>',
      controller: LocationEdit,
      controllerAs: 'vm',
      size: 'md',
      resolve: {
        init: ['LocationModel', ( LocationModel ) => LocationModel.initItem( id )]
      }
    } ).result.then( ModalService.onSuccess(), ModalService.onError( $modal, 'app.settings.locations' ) ).finally( ModalService.onFinal( 'app.settings.locations' ) );
  }]
} )
@Inject( '$modalInstance', 'ModalModel' )
class LocationEdit {
  constructor( $modalInstance, ModalModel ) {
    ModalModel.setItem( $modalInstance );
  }
}

export default LocationEdit;
