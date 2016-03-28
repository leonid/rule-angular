'use strict'

import template from './resource.attributes.html'
import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'resource-attributes'
} )
@View( {
  template: template
} )
@Inject( 'ResourceModel' )
class ResourceAttributes {
  constructor( ResourceModel ) {
    this.resource = ResourceModel.getItem()
  }
}

export default ResourceAttributes
