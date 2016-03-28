'use strict';

import template from './schedule.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants';
import {RouteConfig, Component, View} from '../../../decorators/decorators'

@RouteConfig( 'app.schedule', {
  url: '/schedule',
  template: '<schedule></schedule>',
  data: {
    access: ACCESS_LEVELS.employee
  }
} )
@Component( {
  selector: 'schedule'
} )
@View( {
  template: template
} )
class Schedule {
}
