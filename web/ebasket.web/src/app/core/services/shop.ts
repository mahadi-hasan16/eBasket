import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class Shop {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  getProducts(){
    return this.http.get<Pagination<Product>>(this.baseUrl+'products');
  }
}
