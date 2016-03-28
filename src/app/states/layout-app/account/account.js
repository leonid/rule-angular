'use strict';

import './account-details/account-details';
import './contact-details/contact-details';
import './password/password';
import template from './account.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'app.account', {
  url: '/account',
  abstract: true,
  template: '<account></account>',
  resolve: {
    init: ['$rootScope', 'EmployeeResource', 'EmployeeModel', ( $rootScope, EmployeeResource, EmployeeModel ) => Promise.all( [EmployeeResource.getAccountDetails( $rootScope.currentUser.id ).then( data => EmployeeModel.setItem( data ) )] )]
  },
  data: {
    access: ACCESS_LEVELS.employee
  }
} )
@Component( {
  selector: 'account'
} )
@View( {
  template: template
} )
@Inject( 'EmployeeModel' )
class Account {
  constructor( EmployeeModel ) {
    this.employee = EmployeeModel.getItem();
  }
}

export default Account;
