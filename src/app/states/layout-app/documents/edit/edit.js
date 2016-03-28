'use strict';

import {RouteConfig, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'app.documents.edit', {
  url: '/:id/edit',
  onEnter: ['$stateParams', '$modal', 'ModalService', ( $stateParams, $modal, ModalService ) => {
    const id = $stateParams.id;
    $modal.open( {
      template: '<modal-document></modal-document>',
      controller: DocumentEdit,
      controllerAs: 'vm',
      size: 'md',
      resolve: {
        init: ['DocumentModel', 'EmployeeModel', ( DocumentModel, EmployeeModel ) => Promise.all( [DocumentModel.initItem( id ), EmployeeModel.initCollection()] )]
      }
    } ).result.then( ModalService.onSuccess(), ModalService.onError( $modal, 'app.documents' ) ).finally( ModalService.onFinal( 'app.documents' ) );
  }]
} )
@Inject( '$modalInstance', 'ModalModel' )
class DocumentEdit {
  constructor( $modalInstance, ModalModel ) {
    ModalModel.setItem( $modalInstance );
  }
}

export default DocumentEdit;
