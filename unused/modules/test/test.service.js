export default class TestService {

  constructor($http) {
    this.$http = $http
  }

  getResources() {
    return this.$http.get('/resources')
  }

  getResource(name) {
    return this.$http.get('/resource/' + name)
  }

  saveResource(resource) {
    return this.$http.post('/resources', resource)
  }

  searchResource(query) {
    return this.$http.get('/resources/search/' + query)
  }

}

TestService.$inject = ['$http']
