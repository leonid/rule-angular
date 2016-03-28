'use strict';

import './add/add';
import './edit/edit';
import template from './documents.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'app.documents', {
  url: '/documents',
  template: '<documents></documents>',
  resolve: {
    init: ['DocumentModel', DocumentModel => DocumentModel.initCollection()]
  },
  data: {
    access: ACCESS_LEVELS.employee
  }
} )
@Component( {
  selector: 'documents'
} )
@View( {
  template: template
} )
@Inject( 'FormService', 'DocumentModel' )
class Documents {
  constructor( FormService, DocumentModel ) {
    this.documents = DocumentModel.getCollection(); // TODO: this needs to change as we need to pass queries in url so back can filter documents depend on the permission and user role
    this.FormService = FormService;
    this.DocumentModel = DocumentModel;
  }

  deleteDocument( document ) {
    this.FormService.delete( this.DocumentModel, document, this );
  }
}

export default Documents;
