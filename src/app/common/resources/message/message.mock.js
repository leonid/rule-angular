'use strict';

import AbstractResourceMock from '../abstract.resource.mock'
import {Run, Inject} from '../../../decorators/decorators'

class MessageResourceMock extends AbstractResourceMock {
  @Run()
  @Inject( '$httpBackend', 'localStorageService' )
  runFactory( $httpBackend, localStorageService ) {
    super.init( $httpBackend, localStorageService, 'emails', {}, [], 'subject' );
  }
}
