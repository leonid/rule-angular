import {Immutable} from 'immutable'

export default class ImmutableService {
  constructor() {
    var map1 = Immutable.Map( {a: 1, b: 2, c: 3} )
    var map2 = map1.set( 'b', 50 )
    map1.get( 'b' ) // 2
    map2.get( 'b' ) // 50
  }

}
