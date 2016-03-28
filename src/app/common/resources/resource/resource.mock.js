'use strict'

import resource from './fixtures/resource.json'
import resources from './fixtures/resources.json'
import AbstractResourceMock from '../abstract.resource.mock'
import {Run, Inject} from '../../../decorators/decorators'

class ResourceResourceMock extends AbstractResourceMock {
  @Run()
  @Inject( '$httpBackend', 'localStorageService' )
  runFactory( $httpBackend, localStorageService ) {
    $httpBackend.whenGET( /\/resources\/([^&]*)\/unique/ )
      .respond( ( method, url ) => {
        console.log( 'GET', url )
        const label = url.match( /\/resources\/([^&]*)\/unique/ )[1]
        const dataListLocal = localStorageService.findLocalStorageItems( new RegExp( 'resource_(\\d+|[a-z]*)' ) )
        const dataLocal = dataListLocal.find( ( resource ) => resource.label === label )

        if ( !dataLocal ) {
          return [404]
        }

        return [200, dataLocal]
      } )

    super.init( $httpBackend, localStorageService, 'resources', resource, resources, 'firstName' )
  }
}
