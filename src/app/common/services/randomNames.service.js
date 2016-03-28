import angular from 'angular'

/** Class representing a service that returns names. */
class RandomNames {
  constructor() {
    this.names = ['John', 'Elisa', 'Mark', 'Annie'];
  }

  getName() {
    const totalNames = this.names.length;
    const rand = Math.floor( Math.random() * totalNames );
    return this.names[rand];
  }
}

export default angular.module( 'services.random-names', [] )
  .service( 'randomNames', RandomNames )
  .name;
