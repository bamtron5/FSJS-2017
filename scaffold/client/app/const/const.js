//MAINTAIN ALPHABETICALLY
export default angular.module('library-app')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('CHAT_STATUS', {
    loading: 'loading',
    connected: 'connected',
    disconnected: 'disconnected'
  })
  .constant('IP_INFO', '//ipinfo.io/json')
  .constant('MD_THEMES', {
    default: {
      name: 'default',
      options: {

      }
    }
    // pallete: {
    //   name: 'default-primary',
    //   options: {
    //     '700': '273343'
    //   }
    // }
  })
  .constant('PAGINATION_LIMIT', 10)
  .constant('TIMEOUTS', {
    user_resolve: 7500
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin'
  });
