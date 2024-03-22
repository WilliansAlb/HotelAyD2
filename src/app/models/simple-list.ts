import { Pagination } from 'src/app/models/util.model';

export class SimpleList {
  pagination: Pagination;

  constructor() {
    this.pagination = new Pagination();
  }

  resetPagination(paginationTemp: Pagination): void {
    paginationTemp.startElement = 0;
    paginationTemp.pageIndex = 0;
    paginationTemp.lastElement = paginationTemp.pageSize;
    paginationTemp.filter = paginationTemp.total.slice(paginationTemp.startElement, paginationTemp.lastElement);
    paginationTemp.lastElement = paginationTemp.filter.length;
  }
}
