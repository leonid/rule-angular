import TestTemplate from './test.html';

var testDirective = function () {
  return {
    restrict: 'E',
    template: TestTemplate,
    controller: 'TestController',
    controllerAs: 'component',
    bindToController: true,
    scope: {}
  };
};

export default testDirective;
