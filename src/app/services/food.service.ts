import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Food } from 'src/app/models/htl-food.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private URL: string = `${environment.HTL_BACKEND_URL}/food`;

  constructor(private http: HttpClient) {
  }

  findById(foodId: number) {
    return this.http.get<Food>(`${this.URL}/${foodId}`);
  }

  findAll() {
    return this.http.get<Food>(this.URL);
  }

  save(food: Food) {
    if (food.foodId) return this.http.put<Food>(`${this.URL}/${food.foodId}`, food);
    return this.http.post<Food>(this.URL, food);
  }
}
