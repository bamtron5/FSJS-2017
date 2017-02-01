import angular from 'angular';
import 'angular-resource';
import '@angular/router/angular1/angular_1_router';
import 'ngstorage';

import Constants from './const/const';
import ConfigProvider from './app.config.js';
import HomeComponent from './components/home/home';
import AuthComponent from './components/auth/auth';
import UserService from './services/user';
import SessionService from './services/session';
import _ from './factories/lodash';
import Filters from './filters/filters';

//INJECT YOUR PAGES
const topLevelComponents = [
  HomeComponent
];

//INJECT YOUR SUB COMPONENTS
const lowLevelComponents = [
  AuthComponent
];

const topLevelProviders = [
  ConfigProvider
];

const topLevelFactories = [
  _
];
//
// const topLevelDirectives = [
//
// ];
//
const topLevelServices = [
  UserService,
  SessionService
];

const topLevelFilters = [
  Filters
];

const Config = ['$locationProvider', ($locationProvider) => {
  $locationProvider.html5Mode(true);
  // $locationProvider.otherwise('/');
}];

const Runners = () => {

};

class controller {
  constructor(

  ) {

  }
}


//TODO ngComponentRouter is deprecated use https://ui-router.github.io/guide/ng1/route-to-component
const Component = {
  templateUrl: './client/ngApp/app.html',
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

const appDependencies = ['ngComponentRouter', 'ngResource', 'ngStorage'].concat(topLevelProviders);
const modules = ['App'].concat(Constants, topLevelFactories, topLevelServices,
  topLevelFilters, topLevelComponents, lowLevelComponents);
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
