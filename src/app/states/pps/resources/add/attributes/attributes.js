'use strict'

import {RouteConfig} from '../../../../../decorators/decorators'

@RouteConfig( 'pps.resources.add.attributes', {
  url: '/resource-attributes',
  views: {
    'modal@': {
      template: '<resource-attributes></resource-attributes>'
    }
  }
} )
class ResourceAddAttributes {
}
