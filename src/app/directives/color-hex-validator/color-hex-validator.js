'use strict';

import {Directive} from '../../decorators/decorators'
const HEX_REGEXP = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

@Directive( {
  selector: 'mm-color-hex-validator'
} )
class MmColorHexValidator {
  constructor() {
    this.require = 'ngModel';
    this.restrict = 'A';
  }

  link( scope, element, attrs, ngModel ) {
    ngModel.$validators.hexcode = function ( value ) {
      return HEX_REGEXP.test( value );
    };
  }

  static directiveFactory() {
    MmColorHexValidator.instance = new MmColorHexValidator();
    return MmColorHexValidator.instance;
  }
}

export default MmColorHexValidator;
