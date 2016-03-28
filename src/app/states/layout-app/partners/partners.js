'use strict';

import './add/add';
import './edit/edit';
import template from './partners.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'app.partners', {
  url: '/partners',
  template: '<partners></partners>',
  resolve: {
    init: ['PartnerModel', PartnerModel => PartnerModel.initCollection()]
  },
  data: {
    access: ACCESS_LEVELS.manager
  }
} )
@Component( {
  selector: 'partners'
} )
@View( {
  template: template
} )
@Inject( 'FormService', 'PartnerModel' )
class Partners {
  constructor( FormService, PartnerModel ) {
    this.partners = PartnerModel.getCollection();
    this.FormService = FormService;
    this.PartnerModel = PartnerModel;
  }

  deletePartner( partner ) {
    this.FormService.delete( this.PartnerModel, partner, this );
  }
}

export default Partners;
