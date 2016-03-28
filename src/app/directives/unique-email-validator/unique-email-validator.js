'use strict'

import {Directive, Inject} from '../../decorators/decorators'

// const EMPLOYEE_MODEL = new WeakMap()
// const EMPLOYEE_RESOURCE = new WeakMap()
@Directive( {
  selector: 'mm-unique-email-validator'
} )
class MmUniqueEmailValidator {
  constructor( EmployeeModel, EmployeeResource ) {
    this.require = 'ngModel'
    this.restrict = 'A'
    this.EMPLOYEE_MODEL = EmployeeModel
    this.EMPLOYEE_RESOURCE = EmployeeResource
  }

  link( scope, element, attrs, ngModel ) {
    const currentEmail = this.EMPLOYEE_MODEL.getItem().email
    ngModel.$asyncValidators.unique = ( email ) => {
      return new Promise( ( resolve, reject ) => {
        if ( currentEmail !== email ) {
          this.EMPLOYEE_RESOURCE.getEmployeeByEmail( email ).then( () => {
            // found the employee, therefore not unique
            reject()
          }, () => {
            // employee not found, therefore unique
            resolve()
          } )
        } else {
          resolve()
        }
      } )
    }
  }

  @Inject( 'EmployeeModel', 'EmployeeResource' )
  static directiveFactory( EmployeeModel, EmployeeResource ) {
    MmUniqueEmailValidator.instance = new MmUniqueEmailValidator( EmployeeModel, EmployeeResource )
    return MmUniqueEmailValidator.instance
  }
}

export default MmUniqueEmailValidator
