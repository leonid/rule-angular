'use strict';

import './login/login';
import './activate-account/activate-account';
import './forgot-password/forgot-password';
import './reset-password/reset-password';
import {ACCESS_LEVELS} from '../../common/constants/constants';
import template from './layout-auth.html'
import {RouteConfig} from '../../decorators/decorators'

@RouteConfig( 'auth', {
  url: '',
  abstract: true,
  template: template,
  data: {
    access: ACCESS_LEVELS.public
  }
} )
class LayoutAuth {
}
