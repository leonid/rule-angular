'use strict'

import resource from './fixtures/attribute.fixture.json'
import resources from './fixtures/attributes.fixture.json'
import AbstractResourceMock from '../abstract.resource.mock'
import {Run, Inject} from '../../../decorators/decorators'

class AttributeResourceMock extends AbstractResourceMock {
  @Run()
  @Inject( '$httpBackend', 'localStorageService' )
  runFactory( $httpBackend, localStorageService ) {
    $httpBackend.whenGET( /\/attributes\/([^&]*)\/unique/ )
      .respond( ( method, url ) => {
        console.log( 'GET', url )
        const label = url.match( /\/attributes\/([^&]*)\/unique/ )[1]
        const dataListLocal = localStorageService.findLocalStorageItems( new RegExp( 'attribute_(\\d+|[a-z]*)' ) )
        const dataLocal = dataListLocal.find( ( attribute ) => attribute.label === label )

        if ( !dataLocal ) {
          return [404]
        }

        return [200, dataLocal]
      } )

    super.init( $httpBackend, localStorageService, 'resources', resource, resources, 'firstName' )
  }
}
