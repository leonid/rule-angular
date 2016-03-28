'use strict'

import template from './resource.view.html'
import {RouteConfig, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'pps.resources.view', {
  url: '/:id/view',
  onEnter: ['$stateParams', '$modal', 'ModalService', ( $stateParams, $modal, ModalService ) => {
    const id = $stateParams.id
    let addResourceModal = $modal( {
      template: template,
      resolve: {
        init: [
          'ResourceModel',
          ( ResourceModel ) => ResourceModel.initItem( id )
        ]
      },
      controller: ResourceView,
      controllerAs: 'vm'
    } )

    addResourceModal.$promise.then(
      // ModalService.onSuccess()
      // ModalService.onError($modal, 'pps.resources')
      ModalService.onFinal( 'pps.resources' )
    )
  }]
} )
@Inject( 'ResourceModel' )
class ResourceView {
  constructor( ResourceModel ) {
    this.resource = ResourceModel.getItem()
  }
}

export default ResourceView
