export default class TsogController {
  constructor( $scope, $http, $state ) {
    this.$scope = $scope;
    this.$state = $state;
    this.$http = $http;

    this.data = [];
    this.filter = [];

    this.filterNames = ['tsogType', 'tsogGroup', 'tsogName']

    this.getTSOG();

    this.$scope.$watch( 'tsog.filter.tsogType', ( newValue, oldValue ) => {
        this.filter.tsogGroup = 0;
      }
    );

    this.$scope.$watch( 'tsog.filter.tsogGroup', ( newValue, oldValue ) => {
        this.filter.tsogName = 0;
      }
    );

  }

  getTSOG( label, level ) {

    var level = level || 0;
    var key = label ? label : 'TSOG';
    this.data[this.filterNames[level]] = [];

    var promise = this.$http.get( `/classifier/api/classifierNodes/label/${key}/children` ).then(
      ( response ) => {
        this.data[this.filterNames[level]][key] = response.data.data;
        level++;

        if ( response.data.data && this.filterNames[level] ) {
          response.data.data.forEach( ( item ) => {

            if ( item.label ) {
              this.getTSOG( item.label, level );
            }

          } );
        }
      }
    );

    return promise;
  };


  closeFormular() {
    this.$state.go( 'tsog' );
  }

  loadFormular() {
    this.formular = '11';
    this.$state.go( 'tsog.formular' )
  }

  editTsog() {
    this.$state.go( 'formular' );
  };

}

TsogController.$inject = ['$scope', '$http', '$state'];
