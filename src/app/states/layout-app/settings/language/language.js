'use strict'

import template from './language.html'
import {RouteConfig, Component, View, Inject} from '../../../../decorators/decorators'

@RouteConfig( 'app.settings.language', {
  url: '/language',
  template: '<language></language>',
  resolve: {
    init: ['SettingModel', 'LanguageModel', ( SettingModel, LanguageModel ) => Promise.all( [SettingModel.initItem( 'app' ), LanguageModel.initCollection()] )]
  }
} )
@Component( {
  selector: 'language'
} )
@View( {
  template: template
} )
@Inject( 'SettingModel', 'LanguageModel', 'FormService' )
class Language {
  constructor( SettingModel, LanguageModel, FormService ) {
    this.setting = SettingModel.getItem()
    this.languages = LanguageModel.getCollection()
    this.FormService = FormService
    this.SettingModel = SettingModel
    this.isSubmitting = null
    this.result = null
    this.saveButtonOptions = FormService.getSaveButtonOptions()
  }

  save( form ) {
    if ( !form.$valid ) {
      return
    }
    this.isSubmitting = true
    this.FormService.save( this.SettingModel, this.setting, this, form )
  }
}

export default Language

