'use strict';

// import './language.mock.js#?ENV|mock';
import AbstractResource from '../abstract-resource';
import {Service, Inject} from '../../../decorators/decorators'

@Service( {
  serviceName: 'LanguageResource'
} )
@Inject( '$http' )
class LanguageResource extends AbstractResource {
  constructor( $http ) {
    super( $http, 'languages' );
  }
}

export default LanguageResource;
