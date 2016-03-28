'use strict';

import AbstractModel from './abstract-model';
import {Service, Inject} from '../../decorators/decorators'

@Service( {
  serviceName: 'DocumentModel'
} )
@Inject( 'DocumentResource' )
class DocumentModel extends AbstractModel {
  constructor( DocumentResource ) {
    super( DocumentResource );
    this.files = [];
  }

  getFilesCollection() {
    return this.files;
  }

  initFilesCollection( id ) {
    return this.resource.getDocumentFiles( id ).then( files => this.files = files );
  }
}

export default DocumentModel;
