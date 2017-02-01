class Session {
  constructor(
    $sessionStorage,
    _
  ) {
    this.user = this.getUser();
  }

  create(user) {
    this.$sessionStorage['user'] = user;
  } 

  isAuthenticated() {
    let user = this.getUser();
    return !!user['username'];
  }

  isAuthorized(roles) {
    let user = this.getUser();
    if (!user['roles']){
      return false;
    }

    if (!angular.isArray(roles)) {
      roles = [roles];
    }

    return roles.some((v, k) => {
      for(let i in user['roles']) {
        if (user['roles'][i] === v) {
          return true;
        }
      }
    });
  }

  getUser() {
    return this.$sessionStorage || {};
  }

  destroy() {
    this.$sessionStorage.$reset();
    this.$sessionStorage['user'] = {};
  }
}

Session.$inject = ['$sessionStorage', '_'];

export default
  angular.module('App.services.session', [])
    .service('Session', Session)
    .name;
