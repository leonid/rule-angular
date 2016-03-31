'use strict'

export const AVAILABILITY_DATE_FORMAT = 'YYYYMMDD'
export const EMPLOYEE_PROFILE_STATUSES = Object.freeze( {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending'
} )
export const USER_ROLES = Object.freeze( {
  EMPLOYEE: 'employee',
  SUPERVISOR: 'supervisor',
  MANAGER: 'manager',
  ADMIN: 'admin'
} )
export const ACCESS_LEVELS = Object.freeze( {
  public: ['*'],
  employee: [USER_ROLES.EMPLOYEE, USER_ROLES.SUPERVISOR, USER_ROLES.MANAGER, USER_ROLES.ADMIN],
  supervisor: [USER_ROLES.SUPERVISOR, USER_ROLES.MANAGER, USER_ROLES.ADMIN],
  manager: [USER_ROLES.MANAGER, USER_ROLES.ADMIN],
  admin: [USER_ROLES.ADMIN]
} )

// http://labs.qandidate.com/blog/2014/10/16/using-the-accept-header-to-version-your-api/
export const HEADER_API_VERSION = 'application/json'

export const PROFILE_COMPLETENESS_TYPES = Object.freeze( {
  ACCOUNT: 'account',
  EMPLOYEE: 'employee'
} )
