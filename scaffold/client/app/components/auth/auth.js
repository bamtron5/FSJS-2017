const componentName = 'auth';
const template = './client/app/components/auth/auth.html';

class Auth {
  constructor(
    UserService,
    Session
  ) {
    this.UserService = UserService;
    this.Session = Session;
    this.isAuth = this.Session.isAuthenticated();
  }

  login(user) {
    this.UserService.login(user).then((res) => {
      this.Session.create(res);
      //TODO componentRouter.go
      // this.$state.go('home', null, {reload: true, notify:true});
    }).catch(() => {
      this.Session.destroy();
    });
  }

  register(user) {
    this.UserService.register(user).then(() => {
      alert('Please login.');
    }).catch(() => {
      alert('create proper alerts');
    });
  }
}

Auth.$inject = ['UserService', 'Session'];

const Component = {
  templateUrl: template,
  controller: Auth,
  controllerAs: 'vm'
};

export default
  angular.module('App.sub.auth', [])
    .component(componentName, Component)
    .name;
