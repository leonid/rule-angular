'use strict'

// import './resource.mock.js#?ENV|mock'
import AbstractResource from '../abstract.resource'
import {Service, Inject} from '../../../decorators/decorators'

if ( NODE_ENV === 'test' ) {
  require( './resource.mock.js' )
}

@Service( {
  serviceName: 'ResourceResource'
} )
@Inject( '$http' )
class ResourceResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'resources' )

    this.apiRoot = '/api/resources'

    // this.apiRoot = (NODE_ENV === 'development' ? '/api-fake/resources' : '/api/resources')

  }

  /**
   * Получение всех ресурсов
   */
  getAllResources() {
    return this.http.get( `${this.apiRoot}/all` )
  }

  /**
   * Полнотекстовый поиск ресурса
   *
   * @param query {pattern, mode, attrId}
   * @returns {*}
   */
  getResources( query ) {
    return this.http.get( this.apiRoot, {params: query} )
  }

  /**
   * Получение ресурса
   * @param id
   * @returns {*}
   */
  getResource( id ) {
    return this.http.get( `${this.apiRoot}/${id}` )
  }

  /**
   * Создание ресурса
   *
   * @param resource
   * @returns {*}
   */
  createResource( resource ) {
    return this.http.post( this.apiRoot, resource )
  }

  /**
   * Изменение ресурса
   *
   * @param id
   * @param resource
   * @returns {*}
   */
  saveResource( id, resource ) {
    return this.http.put( this.apiRoot, {
      id: id,
      dto: resource
    } )
  }

  /**
   * Удаление ресурса
   *
   * @param id
   * @returns {boolean|*}
   */
  deleteResource( id ) {
    return this.http.delete( `${this.apiRoot}/${id}` )
  }

  /**
   * Получение родительских ресурсов
   * @param id
   * @returns {Promise}
   */
  getParentResources( id ) {
    return this.http.get( `${this.apiRoot}/${id}/parent` )
  }

  /**
   * Получение дочерних ресурсов
   * @param id
   * @returns {Promise}
   */
  getChildResources( id ) {
    return this.http.get( `${this.apiRoot}/${id}/children` )
  }

  /**
   * Удаление дочерних ресурсов
   * @param id
   * @returns {Promise}
   */
  deleteChildResources( id ) {
    return this.http.delete( `${this.apiRoot}/${id}/children` )
  }

  /**
   * добавление 1 и более ресурса
   * @param id
   * @return
   */
  addChildResources( id, dtos ) {
    return this.http.post( `${this.apiRoot}/${id}/children`, dtos )
  }

  /**
   * Удаление 1 ресурса из связи
   * @param id
   * @return
   */
  deleteChildResource( id, childId ) {
    return this.http.delete( `${this.apiRoot}/${id}/children/${childId}` )
  }

  /**
   * Синхронизация дочерних ресурсов
   * @param id
   * @return
   */
  syncChildResources( id, dtos ) {
    return this.http.put( `${this.apiRoot}/${id}/children`, dtos )
  }

  /**
   * Получить все дочерние атрибуты
   * @param id
   * @return
   */
  getAttributes( id, params, cache = false ) {
    return this.http.get( `${this.apiRoot}/${id}/attributes`, {params: params, cache: cache} )
  }

  /**
   * Удалить все дочерние атрибуты
   * @param id
   * @return
   */
  deleteAttributes( id ) {
    return this.http.delete( `${this.apiRoot}/${id}/attributes` )
  }

  /**
   * добавление 1 и более атрибута в связь
   * @param id
   * @return
   */
  addAttributes( id, dtos ) {
    return this.http.post( `${this.apiRoot}/${id}/attributes`, dtos )
  }

  /**
   * Удаление 1 атрибута из связи
   * @param id
   * @return
   */
  deleteAttribute( id, attrId ) {
    return this.http.post( `${this.apiRoot}/${id}/attributes/${attrId}` )
  }

  /**
   * Синхронизация атрибутов
   * @param id
   * @return {}
   */
  syncAttributes( id, dtos ) {
    return this.http.put( `${this.apiRoot}/${id}/attributes`, dtos )
  }

  /**
   * Список режимов для поиска с полнотекстовым запросом @GET(/resources)
   * @returns {*[]}
   */
  getResourceSearchModes() {
    return [{id: 'all', name: 'Все'}, {id: 'name', name: 'Name'}, {
      id: 'label',
      name: 'Label'
    }, {id: 'id', name: 'ID'}]
  }

  getResourceTypes() {
    return ['ROOT', 'RESOURCE', 'BASE', 'INDICATOR']
  }

  getAttributeStructureTypes() {
    return ['VALUE', 'COLLECTION', 'MAP']
  }

  getAttributeKeyType() {
    return ['']
  }
}

export default ResourceResource
