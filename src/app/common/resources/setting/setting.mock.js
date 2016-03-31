'use strict'

import setting from './fixtures/setting_app.json'
import settings from './fixtures/settings.json'
import AbstractResourceMock from '../abstract.resource.mock'
import {Run, Inject} from '../../../decorators/decorators'

class SettingResourceMock extends AbstractResourceMock {
  @Run()
  @Inject( '$httpBackend', 'localStorageService' )
  runFactory( $httpBackend, localStorageService ) {
    super.init( $httpBackend, localStorageService, 'settings', setting, settings, 'language' )
  }
}
