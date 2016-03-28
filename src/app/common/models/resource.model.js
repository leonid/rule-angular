'use strict'

import AbstractModel from './abstract.model'
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'ResourceModel'
} )
@Inject( 'ResourceResource' )
class ResourceModel extends AbstractModel {
  constructor( ResourceResource ) {
    super( ResourceResource )
    this.ResourceResource = ResourceResource
  }

  getResources( query ) {
    // Удаление пустых querystring
    for ( let qs in query ) {
      if ( !query[qs] || query[qs] === null || query[qs] === undefined ) {
        delete query[qs]
      }
    }

    if ( query ) {
      return this.ResourceResource.getResources( query )
    } else {
      return this.ResourceResource.getAllResources()
    }
  }

  getSearchModes() {
    return this.ResourceResource.getResourceSearchModes()
  }

  getResourceTypes() {
    return this.ResourceResource.getResourceTypes()
  }

}

export default ResourceModel
