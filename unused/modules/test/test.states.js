/**
 * Test states
 * @param $stateProvider
 */
export default function testStates($stateProvider) {

  $stateProvider
    .state('resources', {
      url: '/resources',
      templateUrl: '...',
      controller: 'resourcesController',
      controllerAs: 'resources'
    })

    // Search resources state
    .state('search', {
      url: '/resources/search/:query',
      templateUrl: '...',
      controller: 'resourcesController',
      controllerAs: 'resources'
    })

    // Edit resource state
    .state('resource', {
      url: '/resources/:name',
      resolve: {
        resources: function () { return [] },
        resource: ['$stateParams', 'resourcesService',
          function ($stateParams, resourcesService) {
            return resourcesService.getResource($stateParams.name)
          }]
      },
      templateUrl: '...',
      controller: 'resourcesController',
      controllerAs: 'resources'
    })

}

testStates.$inject = ['$stateProvider']
