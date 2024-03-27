import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SimpleList } from 'src/app/models/simple-list';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.scss']
})
export class FoodListComponent extends SimpleList implements OnInit {

  constructor(
    private foodService: FoodService,
    private toastService: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
  }
}
