const name = 'loading';
const template = '/client/app/directives/loading/loading.html';

export class Loading {
  constructor (

  ) {
    this.templateUrl = template;
    this.restrict = 'A';
  }
}

angular.module('library-app').directive(name, () =>  new Loading());
