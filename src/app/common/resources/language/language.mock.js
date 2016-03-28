'use strict';

import languages from './fixtures/languages.json'
import {HEADER_API_VERSION} from '../../constants/constants';
import {Run, Inject} from '../../../decorators/decorators'

class LanguageResourceMock {
  @Run()
  @Inject( '$httpBackend' )
  static runFactory( $httpBackend ) {
    $httpBackend.whenGET( /\/languages/ )
      .respond( ( method, url, data, headers ) => {
        console.log( 'GET', url );
        headers['Content-Type'] = HEADER_API_VERSION;
        return [200, languages];
      } );
  }
}
