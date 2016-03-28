'use strict'

import './add/resource.add'
import './edit/resource.edit'
import './view/resource.view'

import template from './resources.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants'
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'pps.resources', {
  url: '/resources?startsWith',
  template: '<resources></resources>',
  resolve: {
    init: [
      'ResourceModel',
      ( ResourceModel ) => ResourceModel.initCollection( /*{pattern: 'грузы'}*/ )
    ]
  },
  data: {
    access: ACCESS_LEVELS.public
  }
} )
@Component( {
  selector: 'resources'
} )
@View( {
  template: template
} )
@Inject( 'ResourceModel', 'ResourceResource', 'FormService', '$scope', '$state', '$filter' )
class Resources {
  constructor( ResourceModel, ResourceResource, FormService, $scope, $state, $filter ) {
    this.resources = ResourceModel.getCollection()
    this.filteredResources = this.resources.data
    this.searchModes = ResourceModel.getSearchModes()

    // Поисковые параметры
    this.query = {}

    angular.extend( this.query, $state.params )

    this.FormService = FormService
    this.ResourceModel = ResourceModel
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

    $scope.$on( '$locationChangeSuccess', () => {
      // this.resourceId = $state.params.resourceId
      this.query.startsWith = $state.params.startsWith
    } )

    $scope.$watch( ()=> this.resources, this.resourcesChanged() )
  }

  resourcesChanged( newValue, oldValue ) {
    return () => {
      this.updatefilteredResources()
    }
  }

  getResources() {
    this.ResourceModel.getResources( this.query ).then(
      ( res ) => {
        this.resources = res.data
      }
    )
  }

  // filterResourcesByLetter() {
  //   this.filteredResources = this.filter('startsWith')(this.filteredResources, this.query.startsWith)
  // }

  toggleListView() {
    this.listViewTable = !this.listViewTable
  }

  calculateIndex( index ) {
    return this.config.currentPage * this.config.itemsPerPage + index
  }

  updatefilteredResources() {
    this.filteredResources = this.filter( 'startsWith' )(
      this.filter( 'filter' )( this.resources.data, this.query.word ),
      this.query.startsWith
    )
    this.buildGraphNodes()
    this.buildAlphabetFilter()
  }

  showFiltersPane() {
    this.showFilters = !this.showFilters
  }

  clearQuery() {
    this.query = {}
    this.getResources()
  }

  deleteResource( resource ) {
    this.FormService.delete( this.ResourceModel, resource, this )
  }

  buildAlphabetFilter() {
    let letters = {}

    this.filteredResources.forEach( function ( resource ) {
      let letter = resource.name.charAt( 0 )

      if ( letters[letter] == undefined ) {
        letters[letter] = []
      }

      letters[letter].push( resource )

    } )

    this.alphabet = Object.keys( letters ).sort()
  }

  buildGraphNodes() {
    // let resources = this.filteredResources

    let nodes = []
    let links = []
    let lastNodeId = this.filteredResources && this.filteredResources.length > 0 ? this.filteredResources[this.filteredResources.length - 1].id : null

    this.filteredResources.forEach( function ( node, key ) {

      nodes.push( {
        id: node.id,
        reflexive: (node.parent ? 'true' : 'false'),
        name: node.name,
        weight: 1
      } )

      if ( node.parent !== null && node.parent.id ) {
        links.push( {
          source: node.parent.id,
          target: node.id,
          left: false,
          right: true,
          weight: 1
        } )
      }
    } )

    this.graphNodes = {
      nodes: nodes,
      links: links,
      lastNodeId: lastNodeId
    }
  }
}

export default Resources
