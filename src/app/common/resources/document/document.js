'use strict';

// import './document.mock.js#?ENV|mock';
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../decorators/decorators'

@Service( {
  serviceName: 'DocumentResource'
} )
@Inject( '$http' )
class DocumentResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'documents' );
  }

  getDocumentFiles( id ) {
    return this.http.get( `/${this.route}/${id}/files` );
  }
}

export default DocumentResource;
