'use strict';

import template from './documents-files.html'
import {ACCESS_LEVELS} from '../../../common/constants/constants';
import {RouteConfig, Component, View, Inject} from '../../../decorators/decorators'

@RouteConfig( 'app.documents-files', {
  url: '/documents/:id/files',
  template: '<documents-files></documents-files>',
  resolve: {
    init: ['$stateParams', 'DocumentModel', ( $stateParams, DocumentModel ) => DocumentModel.initFilesCollection( $stateParams.id )]
  },
  data: {
    access: ACCESS_LEVELS.employee
  }
} )
@Component( {
  selector: 'documents-files'
} )
@View( {
  template: template
} )
@Inject( 'FormService', 'DocumentModel', 'DocumentService' )
class Files {
  constructor( FormService, DocumentModel ) {
    this.files = DocumentModel.getFilesCollection().files;
    this.folderName = DocumentModel.getItemById( DocumentModel.getFilesCollection().documentId );
    this.FormService = FormService;
    this.DocumentModel = DocumentModel;
  }

  deleteFile( document ) {
    this.FormService.delete( this.DocumentModel, document, this );
  }
}

export default Files;
