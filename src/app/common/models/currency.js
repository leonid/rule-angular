'use strict';

import AbstractModel from './abstract-model';
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'CurrencyModel'
} )
@Inject( 'CurrencyResource' )
class CurrencyModel extends AbstractModel {
  constructor( CurrencyResource ) {
    super( CurrencyResource );
  }
}

export default CurrencyModel;
