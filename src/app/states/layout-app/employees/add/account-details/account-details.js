'use strict';

import {RouteConfig} from '../../../../../decorators/decorators'

@RouteConfig( 'app.employees.add.account-details', {
  url: '/account-details',
  views: {
    'modal@': {
      template: '<employee-account-details></employee-account-details>'
    }
  }
} )
class EmployeeAddAccountDetails {
}
