'use strict';

import {RouteConfig} from '../../../../../decorators/decorators'

@RouteConfig( 'app.employees.edit.contact-details', {
  url: '/contact-details',
  views: {
    'modal@': {
      template: '<employee-contact-details></employee-contact-details>'
    }
  }
} )
class EmployeeEditContactDetails {
}
