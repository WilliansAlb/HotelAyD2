import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() elements: any = [];
  @Output() changed = new EventEmitter<any[]>();

  // Al realizar modificaciones

  constructor() {
  }

  ngOnInit(): void {

  }

  start() {
    this.elements.pageIndex = 0;
    this.elements.startElement = 0;
    this.filter();
  }

  last() {
    this.elements.pageIndex = Math.ceil(this.elements.total.length / this.elements.pageSize) - 1;
    this.elements.startElement = this.elements.pageIndex * this.elements.pageSize;
    this.filter();
  }

  previous() {
    this.elements.pageIndex--;
    this.elements.startElement = this.elements.pageIndex * this.elements.pageSize;
    this.filter();
  }

  next() {
    this.elements.pageIndex++;
    this.elements.startElement = this.elements.pageIndex * this.elements.pageSize;
    this.filter();
  }

  changePageSize() {
    this.elements.startElement = 0;
    this.elements.pageIndex = 0;
    this.elements.pageSize = parseInt(this.elements.pageSize);
    this.filter();
  }

  isOnLastPage() {
    if (this.elements.total.length == 0) {
      return true;
    } else {
      return Math.ceil(this.elements.total.length / this.elements.pageSize) - 1 == this.elements.pageIndex;
    }
  }

  filter() {
    this.elements.filter = [];
    var temp = 0;

    for (let i = this.elements.startElement; i < this.elements.startElement + parseInt(this.elements.pageSize) && i < this.elements.total.length; i++) {
      this.elements.filter.push(this.elements.total[i]);
      temp = i;
    }
    this.elements.lastElement = temp + 1;
    /* this.changed.emit(this.filterElements); */
  }

  refresh() {
    this.elements.startElement = this.elements.pageIndex * this.elements.pageSize;
    var temporalLast = this.elements.startElement + this.elements.pageSize;
    this.elements.lastElement = (temporalLast < this.elements.total.length) ? temporalLast : this.elements.total.length;
    this.elements.filter = this.elements.total.slice(this.elements.startElement, this.elements.lastElement);
  }

  reset(){
    this.elements.startElement = 0;
    this.elements.pageIndex = 0;
    this.elements.lastElement = this.elements.pageSize;
    this.elements.filter = this.elements.total.slice(this.elements.startElement, this.elements.lastElement);
    this.elements.lastElement = this.elements.filter.length;
    this.changed.emit(this.elements);
  }

}
