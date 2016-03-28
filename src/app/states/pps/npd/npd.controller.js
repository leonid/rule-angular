export default class NpdController {
  constructor( $state, $http, $scope ) {
    /*@ngInject*/

    this.name = 'НПД'
    this.pageIndex = 0
    this.pageSize = 20
    this.catalogId = $state.params.catalogId || 0
    this.documentId = $state.params.documentId || 0
    this.rootId = 0
    this.id = $state.params.documentId || 0
    this.$scope = $scope
    this.$http = $http
    this.$state = $state

    var self = this

    if ( this.catalogId ) {
      this.getCatalogs( $http ).then( function () {
        self.getNpd( $http )
      } )
    } else {
      this.getRoot( $http ).then( function () {
        self.getCatalogs( $http )
      } ).then( function () {
        self.getNpd( $http )
      } )
    }

    this.getFormular( this.id )

    this.$scope.$on( '$locationChangeSuccess', function () {
      self.id = $state.params.id
      self.getFormular( self.id )
    } )

  }

  getList() {
    this.npd = [1, 2, 3, 4, 5]
  }

  getFormular( id ) {
    var self = this
    if ( this.id ) {
      this.$http.get( `/reglament/api/npd/${id}/versions/-1` ).then(
        function ( response ) {
          self.currentDocument = response.data.data
          return response.data
        } )
    }

  }

  getRoot( $http ) {
    var self = this
    var promise = $http.get( '/reglament/api/npd-catalog' ).then(
      function ( response ) {
        self.rootId = response.data.data.id

        self.catalogId = (self.catalogId ? self.catalogId : self.rootId)
        return response.data
      }
    )
    return promise
  }

  hideFormular() {
    this.docIsClosed = true
    this.$state.go( 'npd', {documentId: null} )
  }

  getCatalogs() {
    var self = this
    var promise = this.$http.get( `/reglament/api/npd-catalog/${self.catalogId ? self.catalogId : self.rootId}/children` ).then(
      function ( response ) {
        var invertCrumbs = response.data.data.breadcrumbs.reverse()
        if ( invertCrumbs[1] ) {
          self.rootId = invertCrumbs[1].id
        }

        self.catalogs = response.data.data.catalogs
        self.breadcrumbs = response.data.data.breadcrumbs
        return response.data
      }
    )
    return promise
  }

  getNpd() {
    var self = this
    var promise = this.$http.get( `/reglament/api/npd-catalog/${this.catalogId}/npd` ).then(
      function ( response ) {
        response.data.data.map( function ( el ) {
          let reversedCrumbs = el.breadcrumbs.reverse()
          el.rootId = reversedCrumbs[0].id
        } )

        self.list = response.data.data
        return response.data
      }
    )
    return promise
  }

}

NpdController.$inject = ['$state', '$http', '$scope']

