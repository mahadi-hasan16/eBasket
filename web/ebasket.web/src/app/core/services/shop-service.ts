import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
   private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  brands: string[] = [];
  types: string[] = [];

  getProducts(){
    return this.http.get<Pagination<Product>>(this.baseUrl+'products');
  }

  getBrands(){
    if(this.brands.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/brands')
    .subscribe(
      {
        next: respnse => this.brands = respnse
      }
    )
  }

  getTypes(){
    if(this.types.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/types')
    .subscribe(
      {
        next: respnse => this.types = respnse
      }
    )
  }
}
