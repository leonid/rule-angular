'use strict';

import templateError from './500.html'
import templateNotFound from './404.html'
import templateUnauthorized from './403.html'
import {ACCESS_LEVELS} from '../../common/constants/constants';
import {RouteConfig} from '../../decorators/decorators'

@RouteConfig( '403', {
  url: '/403',
  template: templateUnauthorized,
  data: {
    access: ACCESS_LEVELS.public
  }
} )
@RouteConfig( '404', {
  url: '/404',
  template: templateNotFound,
  data: {
    access: ACCESS_LEVELS.public
  }
} )
@RouteConfig( '500', {
  url: '/500',
  template: templateError,
  data: {
    access: ACCESS_LEVELS.public
  }
} )
class Error {
}
