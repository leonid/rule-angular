'use strict';

import position from './fixtures/position_1.json'
import positions from './fixtures/positions.json'
import AbstractResourceMock from '../abstract-resource-mock';
import {Run, Inject} from '../../../decorators/decorators'

class PositionResourceMock extends AbstractResourceMock {
  @Run()
  @Inject( '$httpBackend', 'localStorageService' )
  runFactory( $httpBackend, localStorageService ) {
    super.init( $httpBackend, localStorageService, 'positions', position, positions, 'name' );
  }
}
