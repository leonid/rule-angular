'use strict';

import template from './complete.html'
import {RouteConfig} from '../../../../../decorators/decorators'

@RouteConfig( 'app.employees.add.complete', {
  url: '/complete',
  views: {
    'modal@': {
      template: template
    }
  }
} )
class EmployeeAddComplete {
}
