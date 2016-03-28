'use strict';

import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'ModalService'
} )
@Inject( '$state' )
class ModalService {
  constructor( $state ) {
    this.route = $state;
  }

  onSuccess() {
    return () => {
    };
  }

  onError( $modal, state ) {
    return ( error ) => {
      if ( error.status ) {
        $modal.open( {
          template: '<error-modal cancel="vm.cancel()" error="vm.error"></error-modal>',
          controller: ['$modalInstance', function ( $modalInstance ) {
            var vm = this;
            vm.error = error;
            vm.cancel = () => $modalInstance.dismiss( 'cancel' );
          }],
          controllerAs: 'vm',
          size: 'md'
        } ).result.finally( () => this.route.go( state ) );
      }
    };
  }

  onFinal( state ) {
    return () => this.route.go( state );
  }
}

export default ModalService;
