'use strict';

import AbstractModel from './abstract-model';
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'LanguageModel'
} )
@Inject( 'LanguageResource' )
class LanguageModel extends AbstractModel {
  constructor( LanguageResource ) {
    super( LanguageResource );
  }
}

export default LanguageModel;
