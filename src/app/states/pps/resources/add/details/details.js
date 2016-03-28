'use strict'

import {RouteConfig} from '../../../../../decorators/decorators'

@RouteConfig( 'pps.resources.add.details', {
  url: '/resource-details',
  views: {
    'modal@': {
      template: '<resource-details></resource-details>'
    }
  }
} )
class ResourceAddDetails {
}
