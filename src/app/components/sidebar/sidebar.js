'use strict'

import './sidebar.styl'
import template from './sidebar.html'

import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'pps-sidebar'
} )
@View( {
  template: template
} )
@Inject( '$scope', '$rootScope', '$document' )
class Sidebar {
  constructor( $scope, $rootScope, $document ) {
    this.rootScope = $rootScope
    $rootScope.sidebarIsClosed = true

    this.document = $document

    $document.on( 'keydown', this.hideSidebarByKey )

    $scope.$on( '$destroy', function () {
      angular.element( $document ).off( 'keydown', this.hideSidebarByKey )
    } )

    $scope.$watch( () => this.sidebarIsClosed, function () {
      return () => {
        $rootScope.sidebarIsClosed = this.sidebarIsClosed
        $rootScope.$apply()
      }
      //
    } )


  }

  toggleSidebar() {
    this.rootScope.sidebarIsClosed = !this.rootScope.sidebarIsClosed
  }

  hideSidebarByKey( event ) {
    if ( event.ctrlKey ) {

      if ( event.keyCode === 192 || event.keyCode === 96 || event.keyCode === 1105 ) {
        event.preventDefault()

        console.log( this.sidebarIsClosed )
        this.rootScope.sidebarIsClosed = !this.rootScope.sidebarIsClosed
      }

    }
  }

}

export default Sidebar
