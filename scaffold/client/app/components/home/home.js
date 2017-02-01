import angular from 'angular';

//DEFINE IT
const componentName = 'home';
const template = './client/app/components/home/home.html';

//CLASSIFY IT
class Home {
  constructor(
    USER_ROLES
  ) {
    console.log(USER_ROLES);
  }
}

//INJECT IT
Home.$inject = ['USER_ROLES'];

//CONTROL IT
const Component = {
  templateUrl: template,
  controller: Home,
  controllerAs: 'vm'
};

//EXPORT IT
export default
  angular.module('App.pages.home', [])
    .component(componentName, Component)
    .name;
