'use strict'

import './account/account'
import './availability/availability'
import './documents/documents'
import './documents-files/documents-files'
import './employees/employees'
import './partners/partners'
import './reports/reports'
import './schedule/schedule'
import './settings/settings.js'
import './plan/plan.states.js'
import template from './layout-app.html'
import {RouteConfig} from '../../decorators/decorators'

@RouteConfig( 'app', {
  url: '',
  abstract: true,
  template: template
  // resolve: {
  //     init: ['SettingModel', SettingModel => SettingModel.initItem('app', null, true)]
  // }
} )
class LayoutApp {
}
