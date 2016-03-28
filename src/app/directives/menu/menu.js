'use strict'

import template from './menu.html'
import {Directive} from '../../decorators/decorators'

@Directive( {
  selector: 'pps-menu'
} )
class Menu {
  constructor() {
    this.restrict = 'E'
    this.replace = true
    this.template = template
  }

  static directiveFactory() {
    Menu.instance = new Menu()
    return Menu.instance
  }
}
export default Menu
