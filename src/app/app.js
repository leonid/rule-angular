/**
 * @author Leonid Romanov
 */
'use strict'

import 'assets/styles/common.styl'

// js vendor files
import angular from 'angular'
import 'angular-ui-router'
import 'angular-local-storage'

import './common/common'
import './components/components'
import './directives/directives'
import './modules/modules'
import './states/states'
import mainModule from './decorators/decorators'

if ( NODE_ENV === 'development' ) {
  console.log( 'starting development application ...' )
}

angular.element( document ).ready( function () {
  angular.bootstrap( document, [mainModule.name], {
    strictDi: true
  } )
} )
