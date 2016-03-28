'use strict'

import AbstractModel from './abstract.model'
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'AttributeModel'
} )
@Inject( 'AttributeResource' )
class AttributeModel extends AbstractModel {
  constructor( AttributeResource ) {
    super( AttributeResource )
    this.attribute = AttributeResource
  }

  getAttributes( query ) {
    // Удаление пустых qs
    for ( let qs in query ) {
      if ( !query[qs] || query[qs] === null || query[qs] === undefined ) {
        delete query[qs]
      }
    }

    if ( query ) {
      return this.AttributeResource.getAttributes( query )
    } else {
      return this.AttributeResource.getAllAttributes()
    }
  }

  getList( id, params, cache ) {
    if ( id ) {
      return this.attribute.getAttributes( id, params, cache ).then( item => this.item = item )
    } else {
      this.item = {}
      /*
       return and resolve helper promise to assure
       consistent API of method so that we can always
       use .then() method when calling initItem
       */
      return Promise.resolve()
    }
  }

}

export default AttributeModel
