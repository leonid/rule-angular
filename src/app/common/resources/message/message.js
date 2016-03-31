'use strict';

// import './message.mock.js#?ENV|mock';
import AbstractResource from '../abstract.resource';
import {Service, Inject} from '../../../decorators/decorators'

@Service( {
  serviceName: 'MessageResource'
} )
@Inject( '$http' )
class MessageResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'emails' );
  }
}

export default MessageResource;
