/* eslint-env jasmine */
'use strict'

import 'angular-mocks'
import ResourceResource from './resource.js'

describe( 'ResourceResource', () => {

  let resourceResource,
    $http,
    $httpBackend,
    email = 'email@test.com',
    route = 'resources',
    id = '1',
    item = {id: id, test: 'test'}

  beforeEach( inject( ( _$http_, _$httpBackend_ ) => {
    $http = _$http_
    $httpBackend = _$httpBackend_
    resourceResource = new ResourceResource( $http )
  } ) )

  afterEach( inject( ( $httpBackend ) => {
    $httpBackend.verifyNoOutstandingExpectation()
    $httpBackend.verifyNoOutstandingRequest()
  } ) )

  it( `should have 'http' property set to $http`, () => {
    expect( resourceResource.http ).toEqual( $http )
  } )

  it( `should have 'route' property set to '${route}'`, () => {
    expect( resourceResource.route ).toEqual( route )
  } )

  it( 'should call GET resource by email resource', inject( ( $httpBackend ) => {
    $httpBackend.whenGET( `/${route}/${email}/unique` ).respond( () => [200, 'email'] )

    resourceResource.getResourceByEmail( email ).then( ( respond ) => {
      expect( respond.data ).toEqual( 'email' )
    } )

    $httpBackend.flush()
  } ) )

  it( 'should call GET account details with `id`', () => {
    $httpBackend.whenGET( `/${route}/${id}/account` ).respond( () => [200, item] )

    resourceResource.getAccountDetails( `${id}` ).then( ( respond ) => {
      expect( respond.data ).toEqual( item )
    } )

    $httpBackend.flush()
  } )

  it( 'should call PUT resource to update account details', () => {
    $httpBackend.whenPUT( `/${route}/${id}/account`, item ).respond( () => [200, item] )

    resourceResource.updateAccountDetails( item ).then( ( respond ) => {
      expect( respond.data ).toEqual( item )
    } )

    $httpBackend.flush()
  } )
} )
