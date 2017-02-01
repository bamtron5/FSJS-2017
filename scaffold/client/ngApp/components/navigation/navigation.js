// const name = 'navigation';
// const template = './client/ngApp/components/navigation/navigation.html';
//
// export class Navigation {
//   constructor(
//     $state,
//     UserService,
//     Session,
//     $stateParams
//   ) {
//     this.currentUser = Session.getUser();
//     this.isAuthenticated = Session.isAuthenticated();
//     this.currentNavItem = $state.current.name;
//   }
//
//   logout() {
//     this.UserService.logout().then(() => {
//       this.Session.destroy();
//       this.$state.go('home', null, {reload: true, notify:true});
//     }).catch((err) => {
//       alert('Logout failed');
//     });
//   }
//
//   isAuthorized(roles) {
//     return this.Session.isAuthorized(roles);
//   }
// }
// angular.module('library-app').component(name, {
//   templateUrl: template,
//   controller: Navigation,
//   controllerAs: 'vm',
//   bindings: {
//     currentNavItem: '<'
//   }
// });
