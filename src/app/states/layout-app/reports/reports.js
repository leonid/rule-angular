'use strict';

import template from './reports.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants';
import {RouteConfig, Component, View} from '../../../decorators/decorators'

@RouteConfig( 'app.reports', {
  url: '/reports',
  template: '<reports></reports>',
  data: {
    access: ACCESS_LEVELS.admin
  }
} )
@Component( {
  selector: 'reports'
} )
@View( {
  template: template
} )
class Reports {
}
