'use strict'

import {Filter} from '../../decorators/decorators'

class StatusLabel {
  @Filter( {
    filterName: 'positionLabel'
  } )
  static positionLabelFilter() {
    return ( positionId, positions ) => {
      if ( !Array.isArray( positions ) ) {
        positions = positions.data
      }
      
      const position = positions.find( position => position.id === positionId )

      return position ? position.name : ''
    }
  }
}
