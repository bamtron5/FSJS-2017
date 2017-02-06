export default angular.module('App.filters', [])
  .filter('formatDate', ['moment', (moment) => {
    return (d) => {
      return moment(d).format('MMM DD, YYYY hh:mm:ss');
    };
  }]).name;
