'use strict'

// import './resource.mock.js#?ENV|mock'
import AbstractResource from '../abstract.resource'
import {Service, Inject} from '../../../decorators/decorators'

if ( NODE_ENV === 'test' ) {
  require( './attribute.resource.mock' )
}

@Service( {
  serviceName: 'AttributeResource'
} )
@Inject( '$http' )
class AttributeResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'api/attributes' )

    this.apiRoot = '/api/attributes'

  }

  /**
   * Получение всех атрибутов
   */
  getAllAttributes() {
    return this.http.get( `${this.apiRoot}/all` )
  }

  /**
   * Полнотекстовый поиск атрибута
   *
   * @param query {String pattern, String mode}
   * @returns {*}
   */
  getAttributes( query ) {
    return this.http.get( this.apiRoot, {params: query} )
  }

  /**
   * Получение атрибута по идентификатору
   * @param id - идентификатор
   * @returns {*}
   */
  getAttribute( id ) {
    return this.http.get( `${this.apiRoot}/${id}` )
  }

  /**
   * Создание атрибута
   *
   * @param dto - данные нового атрибута
   * @returns {*}
   */
  createAttribute( dto ) {
    return this.http.post( this.apiRoot, dto )
  }

  /**
   * Редактирование атрибута
   * @param id - идентификатор
   * @param dto - данные нового атрибута
   * @returns {*}
   */
  updateAttribute( id, dto ) {
    return this.http.put( this.apiRoot, {
      id: id,
      dto: dto
    } )
  }

  /**
   * Удаление атрибута
   *
   * @param id
   * @returns {boolean|*}
   */
  removeAttribute( id ) {
    return this.http.delete( `${this.apiRoot}/${id}` )
  }

}

export default AttributeResource
