'use strict';

import location from './fixtures/location_1.json'
import locations from './fixtures/locations.json'
import AbstractResourceMock from '../abstract.resource.mock'
import {Run, Inject} from '../../../decorators/decorators'

class LocationResourceMock extends AbstractResourceMock {
  @Run()
  @Inject( '$httpBackend', 'localStorageService' )
  runFactory( $httpBackend, localStorageService ) {
    super.init( $httpBackend, localStorageService, 'locations', location, locations, 'name' );
  }
}
