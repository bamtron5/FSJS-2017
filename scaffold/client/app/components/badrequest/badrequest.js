//this is the MAIN CONTROLLER
const name = 'badrequest';
const template = './client/app/components/badrequest/badrequest.html';

export class Badrequest {
  constructor(
  ) {
  }

}

angular.module('library-app').component(name, {
  templateUrl: template,
  controller: Badrequest,
  controllerAs: 'vm'
});
