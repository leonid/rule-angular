'use strict'
import angular from 'angular'

import './npd.styl'

import npdStates from './npd.states.js'
import NpdController from './npd.controller.js'

export default angular
  .module( 'pps.npd', [] )
  .config( npdStates )
  .controller( 'NpdController', NpdController )
  .name
