'use strict';

import template from './modal-position.html'
import {View, Component, Inject} from '../../decorators/decorators'

@Component( {
  selector: 'modal-position'
} )
@View( {
  template: template
} )
@Inject( 'ModalModel', 'PositionModel', 'FormService' )
class PositionModal {
  constructor( ModalModel, PositionModel, FormService ) {
    this.modal = ModalModel.getItem();
    this.position = PositionModel.getItem();
    this.result = null;
    this.isSubmitting = null;
    this.FormService = FormService;
    this.PositionModel = PositionModel;
    this.saveButtonOptions = FormService.getModalSaveButtonOptions();
  }

  cancel() {
    this.modal.dismiss( 'cancel' );
  }

  save( form ) {
    if ( !form.$valid ) {
      return;
    }
    this.isSubmitting = true;
    this.FormService.save( this.PositionModel, this.position, this, form );
  }
}

export default PositionModal;
