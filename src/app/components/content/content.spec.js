/* eslint-env jasmine */
'use strict'

import Content from './content.js'

describe( 'Content', () => {
  let component = '<pps-content></pps-content>'

  beforeEach( angular.mock.module( 'pps' ) )

  describe( 'Component', () => {
    let $compile, $rootScope, scope, render, element

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

    it( 'should contain content component', () => {
      element = render()

      expect( element.controller( 'content' ) ).toBeDefined()
      expect( element['0'] ).not.toEqual( component )
    } )


  } )

  describe( 'Controller', () => {
    let content = new Content()

  } )
} )
