'use strict';

import {RouteConfig, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'app.documents.add', {
  url: '/add',
  onEnter: ['$modal', 'ModalService', ( $modal, ModalService ) => {
    $modal.open( {
      template: '<modal-document></modal-document>',
      controller: DocumentAdd,
      controllerAs: 'vm',
      size: 'md',
      resolve: {
        init: ['DocumentModel', 'EmployeeModel', ( DocumentModel, EmployeeModel ) => Promise.all( [DocumentModel.initItem(), EmployeeModel.initCollection()] )]
      }
    } ).result.finally( ModalService.onFinal( 'app.documents' ) );
  }]
} )
@Inject( '$modalInstance', 'ModalModel' )
class DocumentAdd {
  constructor( $modalInstance, ModalModel ) {
    ModalModel.setItem( $modalInstance );
  }
}

export default DocumentAdd;
