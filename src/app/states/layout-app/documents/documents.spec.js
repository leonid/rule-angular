/* eslint-env jasmine */
'use strict'

import {ACCESS_LEVELS} from '../../../common/constants/constants'
import Documents from './documents.js'

describe( 'Documents', () => {
  let component = '<documents></documents>'

  beforeEach( angular.mock.module( 'ngDecorator' ) )

  describe( 'Route', () => {
    let url = '/documents'
    let state = 'app.documents'
    let currentState
    let $state
    let $injector
    let DocumentModel

    beforeEach( inject( ( _$state_, _$injector_, _DocumentModel_ ) => {
      $state = _$state_
      $injector = _$injector_
      DocumentModel = _DocumentModel_

      currentState = $state.get( state )
    } ) )

    it( 'should have component named `documents`', () => {
      expect( currentState.template ).toEqual( component )
    } )

    it( `should respond to '${url}' URL`, () => {
      expect( $state.href( state ) ).toEqual( url )
    } )

    it( `should resolve 'init' for '${url}' state`, () => {
      spyOn( DocumentModel, 'initCollection' )

      $injector.invoke( currentState.resolve.init )

      expect( DocumentModel.initCollection ).toHaveBeenCalled()
    } )

    it( `should have access level set to '${ACCESS_LEVELS.employee}'`, () => {
      expect( currentState.data.access ).toEqual( ACCESS_LEVELS.employee )
    } )
  } )

  describe( 'Component', () => {
    let $compile
    let $rootScope
    let scope
    let render
    let element

    beforeEach( inject( ( _$compile_, _$rootScope_ ) => {
      $compile = _$compile_
      $rootScope = _$rootScope_
      scope = $rootScope.$new()

      render = () => {
        let element = angular.element( component )
        let compiledElement = $compile( element )( scope )
        $rootScope.$digest()

        return compiledElement
      }
    } ) )

    it( 'should contain documents component', () => {
      element = render()

      expect( element.controller( 'documents' ) ).toBeDefined()
      expect( element['0'] ).not.toEqual( component )
    } )
  } )

  describe( 'Controller', () => {
    let documents
    let FormService
    let DocumentModel
    let collectionMock = 'collectionMock'

    beforeEach( inject( ( _FormService_, _DocumentModel_ ) => {
      FormService = _FormService_
      DocumentModel = _DocumentModel_
    } ) )

    it( 'should have documents property', () => {
      spyOn( DocumentModel, 'getCollection' ).and.returnValue( collectionMock )
      documents = new Documents( FormService, DocumentModel )

      expect( documents.documents ).toEqual( collectionMock )
      expect( DocumentModel.getCollection ).toHaveBeenCalled()
    } )

    it( 'should delete document', () => {
      let document = 'document'
      spyOn( FormService, 'delete' )
      documents = new Documents( FormService, DocumentModel )

      documents.deleteDocument( document )
      expect( FormService.delete ).toHaveBeenCalledWith( DocumentModel, document, documents )
    } )
  } )
} )
