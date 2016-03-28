'use strict';

import AbstractModel from './abstract-model';
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'PositionModel'
} )
@Inject( 'PositionResource' )
class PositionModel extends AbstractModel {
  constructor( PositionResource ) {
    super( PositionResource );
  }
}

export default PositionModel;
