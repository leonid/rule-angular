'use strict'

import template from './modal-warning-unsaved-form.html'
import {Service, Inject, Directive} from '../../decorators/decorators'

@Service( {
  serviceName: 'UnsavedFormsService'
} )
class UnsavedFormsService {
  constructor() {
    this.forms = []
  }

  add( form ) {
    this.forms.push( form )
  }

  remove( form ) {
    const index = this.forms.indexOf( form )

    this.forms.splice( index, 1 )
  }

  areFormsClean() {
    let areAllFormsClean = true
    let clonedArray = this.forms.slice( 0 )

    for ( let form of clonedArray ) {
      // `true` if user has already interacted with the form
      if ( form.$dirty ) {
        areAllFormsClean = false
      } else {
        // remove any non dirty form from `forms` array
        this.remove( form )
      }
    }

    return areAllFormsClean
  }
}

// const MODAL = new WeakMap()
// const STATE = new WeakMap()
// const SERVICE = new WeakMap()

@Directive( {
  selector: 'mm-modal-warning-unsaved-form'
} )
class MmModalWarningUnsavedForm {
  constructor( $modal, $state, UnsavedFormsService ) {
    this.require = '^form'
    this.restrict = 'A'
    this.scope = {
      resetForm: '&mmModalWarningUnsavedForm'
    }
    this.MODAL = $modal
    this.STATE = $state
    this.SERVICE = UnsavedFormsService
  }

  link( scope, element, attrs, formCtrl ) { // jshint unused: false
    this.SERVICE.add( formCtrl )

    // alerts the user when he tries to change the state with unsaved changes
    const onRouteChangeOff = scope.$on( '$stateChangeStart', function ( event, toState ) { // jshint unused: false
      if ( !this.SERVICE.areFormsClean() ) {
        this.MODAL.open( {
          template: template,
          controller: ['$modalInstance', '$state', function ( $modalInstance, $state ) {
            var vm = this

            vm.ok = () => {
              $modalInstance.close()
              onRouteChangeOff() // stop listening for location changes
              $state.go( toState.name )
              this.SERVICE.remove( formCtrl )
              scope.resetForm() // reset form scope
            }

            vm.cancel = () => $modalInstance.dismiss( 'cancel' )
          }],
          controllerAs: 'vm'
        } )

        // prevent navigation by default since we'll handle it
        // once the user selects a dialog option
        event.preventDefault()
      }
    } )
  }

  @Inject( '$modal', '$state', 'UnsavedFormsService' )
  static directiveFactory( $modal, $state, UnsavedFormsService ) {
    MmModalWarningUnsavedForm.instance = new MmModalWarningUnsavedForm( $modal, $state, UnsavedFormsService )
    return MmModalWarningUnsavedForm.instance
  }
}

export {UnsavedFormsService, MmModalWarningUnsavedForm}
