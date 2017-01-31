export class BookService {
  constructor(
    $resource
  ) {
    this.BookCount;
    this.BookPaginate;
    this.BookResource = $resource('/api/books/:id',
      {id: '@id'},
      { update: { method: 'put' }, count: { method: 'get' }}
    );
  }

  deleteBook(id) {
    return this.BookResource.remove({id: id}).$promise;
  }

  getBook(id) {
    return this.BookResource.get({id: id}).$promise;
  }

  queryBook(page) {
    return this.BookResource.query({page: page}).$promise;
  }

  getCount() {
    return this.BookResource.count({id: 'count'}).$promise;
  }

  postBook(book) {
    return this.BookResource.save(book).$promise;
  }
}

angular.module('library-app').service('BookService', BookService);
