'use strict';

import {RouteConfig} from '../../../../../decorators/decorators'

@RouteConfig( 'app.employees.edit.bank-details', {
  url: '/bank-details',
  views: {
    'modal@': {
      template: '<employee-bank-details></employee-bank-details>'
    }
  }
} )
class EmployeeEditBankDetails {
}
