'use strict';

import AbstractModel from './abstract-model';
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'PartnerModel'
} )
@Inject( 'PartnerResource' )
class PartnerModel extends AbstractModel {
  constructor( PartnerResource ) {
    super( PartnerResource );
  }
}

export default PartnerModel;
