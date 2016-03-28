import angular from 'angular'

import TestService from './test.service.js'

export default angular
  .module('rule.test', [])
  .config()
  .service(TestService)
  .controller()
  .name
