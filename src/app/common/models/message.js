'use strict';

import AbstractModel from './abstract.model';
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'MessageModel'
} )
@Inject( 'MessageResource' )
class MessageModel extends AbstractModel {
  constructor( MessageResource ) {
    super( MessageResource );
  }
}

export default MessageModel;
