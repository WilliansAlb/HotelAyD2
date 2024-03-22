import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { filter } from 'rxjs';
import { InputAutocompleteConfiguration } from 'src/app/models/input-autocomplete.model';

@Component({
  selector: 'app-input-autocomplete',
  templateUrl: './input-autocomplete.component.html',
  styleUrls: ['./input-autocomplete.component.scss']
})
export class InputAutocompleteComponent implements OnInit {
  @Input() configuration: InputAutocompleteConfiguration = new InputAutocompleteConfiguration("fa-list",false,false, true,"");
  @Input() filterElements: any[];
  @Input() totalElements: any[];
  @Input() focus: boolean;
  @Input() typeElements: string;
  @Input() allBorderRadius: boolean;
  @Input() placeholder: string;
  @Input() ruleToDisabled: boolean;
  @Output() select = new EventEmitter<any>();
  @Output() create = new EventEmitter<any>();
  @Output() getTitle = new EventEmitter<any>();

  ngOnInit(): void {
    document.addEventListener('click', this.handleDocumentClick);
  }

  handleDocumentClick() {
    const elements = document.getElementsByClassName('suggestions');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const inputElement = element.parentElement.querySelectorAll("input")[0];
      if (!(event.target instanceof HTMLElement) || !inputElement.contains(event.target)) {
        element.classList.remove('suggestions-show');
      }
    }
  }

  handleInput(event: any, init = false) {
    this.filterElements = this.totalElements.filter((element)=>{
      if (element.toString()){
        return element.toString().toUpperCase().includes(this.configuration.value.toUpperCase());
      } 
    });
    if (this.filterElements.length == 0){
      this.configuration.icon = "fa-xmark";
      this.configuration.verified = false;
    } else {
      if (init){
        return;
      }
      this.configuration.icon = "fa-list";
      this.configuration.verified = false;
    }
  }

  changeStatusInput(filterElement) {
    this.configuration.value = filterElement.title;
    this.configuration.icon = "fa-circle-check";
    this.configuration.verified = true;
    this.select.emit({ filterElement });
  }

  focusInput(event: any) {
    this.focus = true;
    this.handleInput(null, true);
    const input = event.target as HTMLInputElement;
    const parentInput = input.parentElement;
    const divElements = parentInput.getElementsByClassName('suggestions')[0];
    divElements.classList.add('suggestions-show');
  };

  getTitleData(filterElement) {
    this.getTitle.emit({ filterElement });
    return filterElement.title;
  }
}
