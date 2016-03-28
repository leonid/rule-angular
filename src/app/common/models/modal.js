'use strict';

import AbstractModel from './abstract-model';
import {Service} from '../../decorators/decorators'

@Service( {
  serviceName: 'ModalModel'
} )
class ModalModel extends AbstractModel {
  constructor() {
    super(); // we only use modal with get/set item to store $modalInstance
  }
}

export default ModalModel;
