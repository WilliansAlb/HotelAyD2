import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdmCategory } from 'src/app/models/adm.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdmCategoryService {

  private URL: string = `${environment.HTL_BACKEND_URL}/categories`;

  constructor(private http: HttpClient) {
  }

  findByInternalId(internalId: number) {
    return this.http.get<AdmCategory>(`${this.URL}/${internalId}`);
  }

  findByParentInternalId(parentInternalId: number) {
    return this.http.get<AdmCategory[]>(`${this.URL}/by-parent/${parentInternalId}`);
  }
}
