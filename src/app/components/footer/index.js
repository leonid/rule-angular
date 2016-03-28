import './footer.styl'
import template from './footer.html'

function FooterController( $log, $scope ) {
  /*@ngInject*/

  $scope.xxx = 'llama'

  $log.log( 'run!' )

}

export default {
  template: template,
  bindings: {},
  scope: {},
  controller: FooterController
}

FooterController.$inject = ['$log', '$scope']
