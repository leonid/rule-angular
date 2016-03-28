/**
 * @author    Leonid Romanov {@link http://linejka.ru}
 * @copyright Copyright (c) 2016, Leonid Romanov
 * @license   GPL-3.0
 */
'use strict'

import {Directive, Inject} from '../../decorators/decorators'

@Inject( '$modalInstance' )
class MmModalReallyClickController {
  constructor( $modalInstance ) {
    this.modal = $modalInstance
  }

  ok() {
    this.modal.close()
  }

  cancel() {
    this.modal.dismiss( 'cancel' )
  }
}

// const MODAL = new WeakMap()
@Directive( {
  selector: 'mm-modal-really-click'
} )
class MmModalReallyClick {
  constructor( $modal ) {
    this.restrict = 'A'
    this.scope = {
      mmModalReallyClick: '&'
    }
    this.MODAL = $modal
  }

  link( scope, element, attrs ) {
    element.bind( 'click', () => {
      const modalInstance = this.MODAL.open( {
        template: `
                    <div class="modal-header">
                        <button type="button" class="close" ng-click="vm.cancel()">×</button>
                        <h4 class="modal-title">${attrs.mmReallyHeader}</h4>
                    </div>
                    <div class="modal-body">
                        <p>${attrs.mmReallyMessage}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-sm btn-white" ng-click="vm.cancel()">Cancel</button>
                        <button class="btn btn-sm btn-success" ng-click="vm.ok()">OK</button>
                    </div>
                `,
        controller: MmModalReallyClickController,
        controllerAs: 'vm'
      } )

      modalInstance.result.then( () => scope.mmModalReallyClick() )
    } )
  }

  @Inject( '$modal' )
  static directiveFactory( $modal ) {
    MmModalReallyClick.instance = new MmModalReallyClick( $modal )
    return MmModalReallyClick.instance
  }
}

export {MmModalReallyClick, MmModalReallyClickController}
