'use strict';

import AbstractModel from './abstract.model';
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'SettingModel'
} )
@Inject( 'SettingResource' )
class SettingModel extends AbstractModel {
  constructor( SettingResource ) {
    super( SettingResource );
  }
}

export default SettingModel;
