'use strict'

import template from './main.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants'
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'pps.main', {
  url: '/main',
  template: '<main></main>',
  data: {
    access: ACCESS_LEVELS.public
  }
} )
@Component( {
  selector: 'main'
} )
@View( {
  template: template
} )
class Main {
  constructor() {
    this.hi = 'ПРивет!'
  }
}

export default Main
