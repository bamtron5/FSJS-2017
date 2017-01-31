export class UserService {
  constructor(
    $resource
  ) {
    this.LogoutResource = $resource('/api/logout/local');
    this.LoginResource = $resource('/api/login/local');
    this.RegisterResource = $resource('/api/Register');
    this.UserResource = $resource('/api/users/:id');
  }

  login(user) {
    return this.LoginResource.save(user).$promise;
  }

  logout() {
    return this.LogoutResource.get().$promise;
  }

  register(user) {
    return this.RegisterResource.save(user).$promise;
  }

  getUser(id) {
    return this.UserResource.get(id).$promise;
  }

  getCurrentUser() {
    return this.$resource('/api/currentuser').get().$promise;
  }
}

angular.module('library-app').service('UserService', UserService);
