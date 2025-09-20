import { HttpClient, HttpParams } from '@angular/common/http';
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

  getProducts(brands?: string[], types?: string[]) {
    let params = new HttpParams();
    if (brands && brands.length > 0) {
      params.append('brands', brands.join(','));
    }

    if (types && types.length > 0) {
      params.append('types', types.join(','));
    }

    params.append('pageSize', 20);

    return this.http.get<Pagination<Product>>(this.baseUrl + 'products', { params });
  }

  getBrands() {
    if (this.brands.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/brands')
      .subscribe(
        {
          next: respnse => this.brands = respnse
        }
      )
  }

  getTypes() {
    if (this.types.length > 0) return;
    return this.http.get<string[]>(this.baseUrl + 'products/types')
      .subscribe(
        {
          next: respnse => this.types = respnse
        }
      )
  }
}
