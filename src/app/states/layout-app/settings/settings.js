'use strict';

import './language/language.js';
import './locations/locations.js';
import './positions/positions.js';
import './currency/currency.js';
import template from './settings.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants';
import {RouteConfig, Component, View} from '../../../decorators/decorators.js'

@RouteConfig( 'app.settings', {
  url: '/settings',
  abstract: true,
  template: '<settings></settings>',
  data: {
    access: ACCESS_LEVELS.admin
  }
} )
@Component( {
  selector: 'settings'
} )
@View( {
  template: template
} )
class Settings {
}

