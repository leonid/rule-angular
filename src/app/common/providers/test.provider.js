class TestServiceProvider {
  constructor() {
    this.apiPath = 'resources/api'
  }

  setApiPath( value ) {
    this.apiPath = value
  }

  $get( $http ) {
    return {
      getThings: () => $http.get( this.apiPath )
    }
  }

}

export default TestServiceProvider
