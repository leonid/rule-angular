'use strict'

import './details/details'
import './attributes/attributes'

import template from './resource.add.html'
import {RouteConfig, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'pps.resources.add', {
  url: '/add',
  onEnter: ['$modal', 'ModalService', ( $modal, ModalService ) => {
    let addResourceModal = $modal( {
      template: template,
      resolve: {
        init: [
          'ResourceModel',
          ( ResourceModel ) => ResourceModel.initItem()
        ]
      },
      controller: ResourceAdd,
      controllerAs: 'vm'
    } )

    addResourceModal.$promise.then(
      ModalService.onFinal( 'pps.resources' )
    )
  }]
} )
@Inject( '$state', '$rootScope', 'ResourceModel', 'FormService', '$modal' )
class ResourceAdd {
  constructor( $state, $rootScope, ResourceModel, FormService, $modal ) {
    this.modal = $modal
    this.state = $state
    this.result = null
    this.resource = ResourceModel.getItem()
    this.FormService = FormService
    this.isSubmitting = null
    this.ResourceModel = ResourceModel
    this.saveButtonOptions = Object.assign( {}, FormService.getModalSaveButtonOptions() ) // clone the modal save button options so we don't overwrite default one
    this.saveButtonOptions.buttonDefaultText = 'Создать ресурс'
    this.saveButtonOptions.buttonSuccessText = 'Ресурс создан'
    this.saveButtonOptions.buttonSubmittingText = 'Создание ресурса'
    // only resourceDetailsForm form has required fields
    this.formSteps = [
      {route: 'pps.resources.add.details', formName: 'resourceDetailsForm', valid: false},
      {route: 'app.resources.add.attributes', formName: 'resourceAttributesForm', valid: true}
    ]

    this.resourceTypes = ResourceModel.getResourceTypes()

  }

  goToNextSection( isFormValid, form, route ) {
    this.hasError = false
    this.FormService.submitChildForm( this.state.current.name, form, this.formSteps )
    if ( isFormValid ) {
      if ( route ) {
        this.state.go( route )
      } else {
        form.$setPristine()
        this.state.go( this.FormService.nextState( this.state.current.name, this.formSteps ) )
      }
    }
  }

  goToPreviousSection() {
    this.state.go( this.FormService.previousState( this.state.current.name, this.formSteps ) )
  }

  save( form ) {
    if ( this.FormService.hasInvalidChildForms( this.state, this.formSteps ) ) {
      return
    }

    this.isSubmitting = true
    this.FormService.save( this.ResourceModel, this.resource, this, form )
  }
}

export default ResourceAdd
