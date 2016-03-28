'use strict'

import {Directive, Inject} from '../../decorators/decorators'

// const LOCATION = new WeakMap()
// const ANCHOR_SCROLL = new WeakMap()

@Directive( {
  selector: 'mm-scroll-up'
} )
class MmScrollUp {
  constructor( $location, $anchorScroll ) {
    this.restrict = 'A'
    this.LOCATION = $location
    this.ANCHOR_SCROLL = $anchorScroll
  }

  link( scope, element, attrs ) {
    element.on( 'click', function () {
      this.LOCATION.hash( attrs.mmScrollUp )
      this.ANCHOR_SCROLL()
    } )
  }

  @Inject( '$modal', '$anchorScroll' )
  static directiveFactory( $location, $anchorScroll ) {
    MmScrollUp.instance = new MmScrollUp( $location, $anchorScroll )
    return MmScrollUp.instance
  }
}

export default MmScrollUp
