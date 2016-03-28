'use strict'

import template from './attribute.view.html'
import {RouteConfig, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'pps.attributes.view', {
  url: '/:id/view',
  onEnter: ['$stateParams', '$aside', '$state', ( $stateParams, $aside, $state ) => {
    const id = $stateParams.id
    let addAttributeAside = $aside( {
      template: template,
      resolve: {
        init: [
          'AttributeModel',
          ( AttributeModel ) => AttributeModel.initItem( id )
        ]
      },
      controller: AttributeView,
      controllerAs: 'vm'
    } )


    addAttributeAside.$promise.then(
      $state.go( 'pps.attributes' )
    )
  }]
} )
@Inject( 'AttributeModel', '$scope' )
class AttributeView {
  constructor( AttributeModel ) {
    this.attribute = AttributeModel.getItem().data
  }
}

export default AttributeView
