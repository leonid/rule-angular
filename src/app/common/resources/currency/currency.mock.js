'use strict'

import currencies from './fixtures/currencies.json'
import {HEADER_API_VERSION} from '../../constants/constants'
import {Run, Inject} from '../../../decorators/decorators'

class CurrencyResourceMock {
  @Run()
  @Inject( '$httpBackend' )
  static runFactory( $httpBackend ) {
    $httpBackend.whenGET( /\/currencies/ )
      .respond( ( method, url, data, headers ) => {
        console.log( 'GET', url )
        headers['Content-Type'] = HEADER_API_VERSION
        return [200, currencies]
      } )
  }
}
