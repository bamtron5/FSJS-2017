angular.module('library-app',
  ['ngResource',
    'ui.router',
    'ngStorage',
    'ngMessages',
    'ngAnimate',
    'angularMoment',
    'ngSanitize'
  ]).config((
    $resourceProvider,
    $stateProvider,
    $urlRouterProvider,
    $locationProvider,
    USER_ROLES,
    MD_THEMES,
    $httpProvider
  ) => {
    //
    $stateProvider
      .state('main', {
        url: '',
        abstract: true,
        template: '<main-app></main-app>',
        resolve: {
          currentUser: ['Session', (Session) => {
            return Session.getUser();
          }],
          isAuthenticated: ['Session', (Session) => {
            return Session.isAuthenticated();
          }],
          currentNavItem: ['$state', ($state) => {
            return $state.current.name;
          }]
        }
      })
      .state('home', {
        url: '/',
        parent: 'main',
        template: '<splash></splash>'
      })
      .state('authenticate', {
        url: '/authenticate',
        parent: 'main',
        template: '<auth></auth>'
      })
      .state('badrequest', {
        url: '/badrequest',
        parent: 'main',
        template: '<badrequest></badrequest>'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true,
      rewriteLinks: false
    });

    $urlRouterProvider.otherwise('/badrequest');

    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })
  .factory('_', ['$window',
    function($window) {
      // place lodash include before angular
      return $window._;
    }
  ])
  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized,
          419: AUTH_EVENTS.sessionTimeout,
          440: AUTH_EVENTS.sessionTimeout
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })
  .run(
    [
      '$rootScope',
      'UserService',
      '$sessionStorage',
      'Session',
      '$state',
      '_',
      'AUTH_EVENTS',
      (
        $rootScope,
        UserService,
        $sessionStorage,
        Session,
        $state: ng.ui.IStateService,
        _,
        AUTH_EVENTS
      ) => {
        $rootScope.$on('$stateChangeStart', (event, next) => {
          UserService.getCurrentUser().then((user) => {
            $sessionStorage.user = user;
            Session.user = Session.getUser();
          }).catch((user) => {
            $sessionStorage.user = user;
            Session.user = Session.getUser();
          });
          let authorizedRoles = !_.isUndefined(next.data, 'authorizedRoles')
            ? next.data.authorizedRoles : false;
          if (authorizedRoles && !Session.isAuthorized(authorizedRoles)) {
            event.preventDefault();
            if(Session.isAuthenticated()){
              //TODO dialog
              $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
              $state.go('home');
            } else {
              $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
              $state.go('home');
            }
          }
        });
      }
    ]
  );
