'use strict'

import './resources/resources.states'
import './attributes/attributes.states'
import './main/main'
// import './plan/plan.states'
// import './test/test.module'
// import './npd/npd'

import ppsTemplate from './pps.layout.html'
import {RouteConfig} from '../../decorators/decorators'


@RouteConfig( 'pps', {
  url: '',
  abstract: true,
  template: ppsTemplate
  // resolve: {
  //   init: ['SettingModel', SettingModel => SettingModel.initItem('pps', null, true)]
  // }
} )
class LayoutPps {
}

