'use strict'

import template from './resource.edit.html'
import {RouteConfig, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'pps.resources.edit', {
  url: '/:id/edit',
  onEnter: ['$stateParams', '$modal', 'ModalService', ( $stateParams, $modal, ModalService ) => {
    const id = $stateParams.id
    let editResourceModal = $modal( {
      template: template,
      resolve: {
        init: [
          'ResourceModel',
          ( ResourceModel ) => ResourceModel.initItem( id )
        ]
      },
      controller: ResourceEdit,
      controllerAs: 'vm'
    } )

    editResourceModal.$promise.then(
      // ModalService.onSuccess()
      // ModalService.onError($modal, 'pps.resources')
      ModalService.onFinal( 'pps.resources' )
    )
  }]
} )
@Inject( 'ResourceModel' )
class ResourceEdit {
  constructor( ResourceModel ) {
    this.resource = ResourceModel.getItem()
    this.resourceTypes = ResourceModel.getResourceTypes()
  }
}

export default ResourceEdit
