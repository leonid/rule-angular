'use strict';

import AbstractModel from './abstract-model';
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'LocationModel'
} )
@Inject( 'LocationResource' )
class LocationModel extends AbstractModel {
  constructor( LocationResource ) {
    super( LocationResource );
  }

  getDefaultLocation() {
    return super.getCollection().find( location => location.default );
  }
}

export default LocationModel;
