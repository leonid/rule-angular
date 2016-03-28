'use strict'

import template from './content.html'
import {View, Component} from '../../decorators/decorators'

@Component( {
  selector: 'pps-content'
} )
@View( {
  template: template
} )
class Content {
  constructor() {
  }
}

export default Content
