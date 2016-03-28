'use strict';

import template from './schedule.html'
import {RouteConfig, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'app.employees.schedule', {
  url: '/:id/schedule',
  onEnter: ['$stateParams', '$modal', 'ModalService', function ( $stateParams, $modal, ModalService ) {
    //var id = $stateParams.id;
    $modal.open( {
      template: template,
      resolve: {
        /* @ngInject */
        //employee: function(EmployeeResource) {
        //    return EmployeeResource.get(id);
        //}
      },
      controller: EmployeeSchedule,
      controllerAs: 'vm',
      size: 'md'
    } ).result.finally( ModalService.onFinal( 'app.employees' ) );
  }]
} )
@Inject( '$modalInstance' )
class EmployeeSchedule {
  constructor( $modalInstance ) {
    this.modal = $modalInstance;
  }

  cancel() {
    this.modal.dismiss( 'cancel' );
  }
}

export default EmployeeSchedule;
