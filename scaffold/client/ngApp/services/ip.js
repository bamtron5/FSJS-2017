export class IPService {
  constructor(
    $resource,
    IP_INFO
  ) {

    this.IPResource = $resource(IP_INFO);
  }

  getIP() {
    return this.IPResource.get().$promise;
  }
}

angular.module('library-app').service('IPService', IPService);
