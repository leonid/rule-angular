'use strict';

import template from './currency.html'
import {RouteConfig, Component, View, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'app.settings.currency', {
  url: '/currency',
  template: '<currency></currency>',
  resolve: {
    init: ['SettingModel', 'CurrencyModel', ( SettingModel, CurrencyModel ) => Promise.all( [SettingModel.initItem( 'app' ), CurrencyModel.initCollection()] )]
  }
} )
@Component( {
  selector: 'currency'
} )
@View( {
  template: template
} )
@Inject( 'SettingModel', 'CurrencyModel', 'FormService' )
class Currency {
  constructor( SettingModel, CurrencyModel, FormService ) {
    this.setting = SettingModel.getItem();
    this.currencies = CurrencyModel.getCollection();
    this.FormService = FormService;
    this.SettingModel = SettingModel;
    this.isSubmitting = null;
    this.result = null;
    this.saveButtonOptions = FormService.getSaveButtonOptions();
  }

  save( form ) {
    if ( !form.$valid ) {
      return;
    }

    this.isSubmitting = true;
    this.setting.currencySymbol = this.currencies.find( currency => currency.code === this.setting.currencyCode ).symbol;
    this.FormService.save( this.SettingModel, this.setting, this, form );
  }
}

export default Currency;
