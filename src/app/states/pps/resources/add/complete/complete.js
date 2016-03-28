'use strict'

import template from './complete.html'
import {RouteConfig} from '../../../../../decorators/decorators'

@RouteConfig( 'pps.resources.add.complete', {
  url: '/complete',
  views: {
    'modal@': {
      template: template
    }
  }
} )
class ResourceAddComplete {
}
