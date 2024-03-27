import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryEnum } from 'src/app/enums/category.enum';
import { MessageEnum } from 'src/app/enums/message.enum';
import { AdmCategory } from 'src/app/models/adm.model';
import { AdmCategoryService } from 'src/app/services/adm-category.service';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-food-crud',
  templateUrl: './food-crud.component.html',
  styleUrls: ['./food-crud.component.scss']
})
export class FoodCrudComponent implements OnInit {

  foodType: AdmCategory[] = [];

  constructor(
    private categoryService: AdmCategoryService,
    private toastService: ToastrService,
    private foodService: FoodService
  ) {
  }

  ngOnInit(): void {
    this.categoryService.findByParentInternalId(CategoryEnum.TYPE_OF_FOOD)
      .subscribe({
        next: categories => {
          this.foodType = categories;
        },
        error: _ => this.toastService.error(MessageEnum.MSG_ERROR_SERVER)
      })
  }

  onSave() {
    // TODO: implement
  }
}
