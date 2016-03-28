'use strict';

import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'profile-completeness-bar'
} )
@View( {
  template: `
        <div class="progress progress-xs mb5">
            <div class="progress-bar"
                 ng-class="{'progress-bar-success': vm.profileCompleteness.percentage >= 70, 'progress-bar-warning': vm.profileCompleteness.percentage < 70 && vm.profileCompleteness.percentage >= 40, 'progress-bar-danger': vm.profileCompleteness.percentage < 40}"
                 ng-style="{'width': vm.profileCompleteness.percentage + '%'}"></div>
        </div>
        <p class="text-muted clearfix">
            <span class="pull-left">Profile completeness</span>
            <span class="pull-right">{{vm.profileCompleteness.percentage}}%</span>
        </p>
    `
} )
@Inject( 'EmployeeModel' )
class ProfileCompletenessBar {
  constructor( EmployeeModel ) {
    this.profileCompleteness = EmployeeModel.getProfileCompleteness();
  }
}

export default ProfileCompletenessBar;
