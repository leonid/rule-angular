import angular from 'angular'

import TestModule from './test'

export default
  angular
    .module('rule.modules', [
      TestModule
    ])
    .name
