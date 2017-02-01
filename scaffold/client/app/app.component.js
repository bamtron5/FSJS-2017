import angular from 'angular';
import 'angular-resource';
import '@angular/router/angular1/angular_1_router';
import Constants from './const/const';
import ConfigProvider from './app.config.js';

//Component Pages
import HomeComponent from './components/home/home';

//INJECT YOUR PAGES
const topLevelComponents = [
  HomeComponent
];

//INJECT YOUR SUB COMPONENTS
const lowLevelComponents = [

];

const topLevelProviders = [
  ConfigProvider
];

const topLevelFactories = [

];

const topLevelDirectives = [

];

const topLevelServices = [

];

const topLevelFilters = [

];

const Config = ['$locationProvider', ($locationProvider) => {
  $locationProvider.html5Mode(true);
}];

const Runners = () => {

};

class controller {
  constructor(

  ) {

  }
}

const Component = {
  templateUrl: './client/app/app.html',
  controllerAs: 'vm',
  controller,
  $routeConfig: [
    {
      path:         '/',
      name:         'Home',
      component:    'home',
      useAsDefault: true
    } //define more pages here
  ]
};

const appDependencies = ['ngComponentRouter', 'ngResource'].concat(topLevelProviders);
const modules = ['App'].concat(Constants, topLevelComponents);
const $body = document.body;

angular
  .module('App', appDependencies)
  .config(Config)
  .run(Runners)
  .value('$routerRootComponent', 'app')
  .component('app', Component);

//this is the new ng-app.  determines on readyness and DI rules
angular.bootstrap($body, modules, { strictDi: true });

// based off https://github.com/zombiQWERTY/angular-component-way-webpack-starter-kit/blob/master/src/components/Core/App/AppComponent.js
