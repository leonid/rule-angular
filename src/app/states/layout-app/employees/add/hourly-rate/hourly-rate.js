'use strict';

import {RouteConfig} from '../../../../../decorators/decorators'

@RouteConfig( 'app.employees.add.hourly-rate', {
  url: '/hourly-rate',
  views: {
    'modal@': {
      template: '<employee-hourly-rate></employee-hourly-rate>'
    }
  }
} )
class EmployeeAddHourlyRate {
}
