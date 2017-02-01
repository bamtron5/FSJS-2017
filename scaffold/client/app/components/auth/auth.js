const componentName = 'auth';
const template = './client/app/components/auth/auth.html';

export class Auth {
constructor(
  UserService,
  Session,
  USER_ROLES
) {
  this.isAuth = this.Session.isAuthenticated();
}

login(user) {
  this.UserService.login(user).then((res) => {
    this.Session.create(res);
    this.$state.go('home', null, {reload: true, notify:true});
  }).catch((err) => {
    this.Session.destroy();
  });
}

register(user) {
  this.UserService.register(user).then((res) => {
    alert('Please login.');
  }).catch((err) => {
    this.regError = err;
  });
}
}
angular.module('library-app').component(componentName, {
templateUrl: template,
controller: Auth,
controllerAs: 'vm'
});
