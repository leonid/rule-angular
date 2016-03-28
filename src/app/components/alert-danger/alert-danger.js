'use strict';

import {View, Component} from '../../decorators/decorators'

@Component( {
  selector: 'alert-danger'
} )
@View( {
  template: `
        <div ng-if="vm.hasError" class="row">
            <div class="col-md-12 col-sm-12">
                <div class="alert alert-danger animated fadeIn">
                    <h4 class="mb0 display-inline-block"><i class="fa fa-exclamation-circle"></i>&nbsp;Error!</h4>
                    <p class="display-inline">&nbsp;{{vm.errorMessage}}</p>
                </div>
            </div>
        </div>
    `,
  bindToController: {
    hasError: '=',
    errorMessage: '='
  }
} )
class AlertDanger {
}
