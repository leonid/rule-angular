'use strict'

import './add/attribute.add'
import './edit/attribute.edit'
import './view/attribute.view'

import template from './attributes.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants'
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'pps.attributes', {
  url: '/attributes',
  template: '<attributes></attributes>',
  resolve: {
    init: [
      'AttributeModel',
      ( AttributeModel ) => AttributeModel.initAll()
    ]
  },
  data: {
    access: ACCESS_LEVELS.public
  }
} )
@Component( {
  selector: 'attributes'
} )
@View( {
  template: template
} )
@Inject( 'AttributeModel', 'AttributeResource', 'FormService', '$scope', '$state', '$filter' )
class Attributes {
  constructor( AttributeModel, AttributeResource, FormService, $scope, $state, $filter ) {

    // angular.extend(this.query, $state.params)

    this.attributes = AttributeModel.getCollection().data

    // Поисковые параметры
    this.query = {}


    this.FormService = FormService
    this.AttributeModel = AttributeModel
    this.listViewTable = true

    this.filter = $filter

    this.config = {
      itemsPerPage: 15,
      maxPages: 7,
      fillLastPage: true,
      paginatorLabels: {
        stepBack: '‹',
        stepAhead: '›',
        jumpBack: '«',
        jumpAhead: '»',
        first: 'Первая',
        last: 'Последняя'
      }
    }

    $scope.$watch( ()=> this.attributes, this.attributesChanged() )
  }

  /**
   *
   * @param index
   * @returns {*}
   */
  calculateIndex( index ) {
    return this.config.currentPage * this.config.itemsPerPage + index
  }

  attributesChanged( newValue, oldValue ) {
    return () => {
      // this.updatefilteredResources()
    }
  }

  getAttributes() {
    this.AttributeModel.getAttributes( this.query ).then(
      ( res ) => {
        this.attributes = res.data
      }
    )
  }

  toggleListView() {
    this.listViewTable = !this.listViewTable
  }


  clearQuery() {
    this.query = {}
    this.getAttributes()
  }

  deleteAttribute( attribute ) {
    this.FormService.delete( this.AttributeModel, attribute, this )
  }

}

export default Attributes
