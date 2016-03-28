'use strict';

import template from './footer.html'
import {View, Component} from '../../decorators/decorators'

@Component( {
  selector: 'footer'
} )
@View( {
  template: template
} )
class Footer {
  constructor() {
    this.copyrightDate = new Date();
  }
}
