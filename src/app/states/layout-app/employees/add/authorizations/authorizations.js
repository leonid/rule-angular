'use strict';

import {ACCESS_LEVELS} from '../../../../../common/constants/constants';
import {RouteConfig} from '../../../../../decorators/decorators'

@RouteConfig( 'app.employees.add.authorizations', {
  url: '/authorizations',
  views: {
    'modal@': {
      template: '<employee-authorizations></employee-authorizations>'
    }
  },
  data: {
    access: ACCESS_LEVELS.admin
  }
} )
class EmployeeAddAuthorizations {
}
