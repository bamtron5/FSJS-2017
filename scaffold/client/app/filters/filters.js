angular.module('library-app')
  .filter('formatDate', (moment) => {
    return (d) => {
      return moment(d).format('MMM DD, YYYY hh:mm:ss');
    };
  });
