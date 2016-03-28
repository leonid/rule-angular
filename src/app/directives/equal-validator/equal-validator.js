'use strict';

import {Directive} from '../../decorators/decorators'

@Directive( {
  selector: 'mm-equal-validator'
} )
class MmEqualValidator {
  constructor() {
    this.require = 'ngModel';
    this.restrict = 'A';
    this.scope = {
      mmEqualValidator: '='
    };
  }

  link( scope, element, attrs, ngModel ) {
    scope.$watch( 'mmEqualValidator', () => {
      ngModel.$validate();
    } );
    ngModel.$validators.equal = function ( value ) {
      return scope.mmEqualValidator === value;
    };
  }

  static directiveFactory() {
    MmEqualValidator.instance = new MmEqualValidator();
    return MmEqualValidator.instance;
  }
}

export default MmEqualValidator;
