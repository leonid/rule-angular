'use strict';

import partner from './fixtures/partner_1.json'
import partners from './fixtures/partners.json'
import AbstractResourceMock from '../abstract.resource.mock'
import {Run, Inject} from '../../../decorators/decorators'

class PositionResourceMock extends AbstractResourceMock {
  @Run()
  @Inject( '$httpBackend', 'localStorageService' )
  runFactory( $httpBackend, localStorageService ) {
    super.init( $httpBackend, localStorageService, 'partners', partner, partners, 'name' );
  }
}
