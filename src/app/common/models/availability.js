'use strict';

import AbstractModel from './abstract.model';
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'AvailabilityModel'
} )
@Inject( 'AvailabilityResource' )
class AvailabilityModel extends AbstractModel {
  constructor( AvailabilityResource ) {
    super( AvailabilityResource );
  }
}

export default AvailabilityModel;
