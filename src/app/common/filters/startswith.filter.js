'use strict'

import {Filter} from '../../decorators/decorators'

class StartsWith {
  @Filter( {
    filterName: 'startsWith'
  } )
  static startsWithFilter() {
    return ( actual, lookup ) => {
      if ( lookup === undefined ) {
        return actual
      }

      return actual.filter( row => {
        let lowerStr = (row.name + '').toLowerCase()

        return lowerStr.indexOf( (lookup + '').toLowerCase() ) === 0
      } )

    }
  }
}
