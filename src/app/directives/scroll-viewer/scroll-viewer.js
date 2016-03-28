'use strict'

import {Directive} from '../../decorators/decorators'

@Directive( {
  selector: 'scroll-viewer'
} )
class ScrollViewer {
  constructor() {
    this.restrict = 'A'
  }

  link( scope, element ) {
    var el = element[0]

    var resize = function resize() {
      var box = el.getBoundingClientRect()
      if ( box.top >= window.innerHeight ) {
        el.style.height = null
      } else {
        var dy = window.innerHeight - box.bottom
        var ch = el.clientHeight
        el.style.height = ((ch + dy - 0.5) | 0) + 'px'

        if ( typeof resize === 'function' ) {
          requestAnimationFrame( resize )
        }
      }
    }

    resize()

    scope.$on( '$destroy', function () {
      resize = angular.noop()
    } )

  }

  static directiveFactory() {
    ScrollViewer.instance = new ScrollViewer()
    return ScrollViewer.instance
  }
}
export default ScrollViewer
