'use strict'

import template from './resource.details.html'
import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'resource-details'
} )
@View( {
  template: template
} )
@Inject( 'ResourceModel' )
class ResourceDetails {
  constructor( ResourceModel ) {
    this.resource = ResourceModel.getItem()
  }
}

export default ResourceDetails
