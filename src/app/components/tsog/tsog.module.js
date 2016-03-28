import angular from 'angular';

import routing from './tsog.routes';
import TsogController from './tsog.controller';

export default angular
  .module( 'app.tsog', [] )
  .config( routing )
  .controller( 'TsogController', TsogController )
  .name;
