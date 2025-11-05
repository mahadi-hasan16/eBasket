import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectorRef, inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { ShopParams } from '../../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  brands: string[] = [];
  types: string[] = [];

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.brands && shopParams.brands.length > 0) {
      params = params.append('brands', shopParams.brands.join(','));
    }

    if (shopParams.types && shopParams.types.length > 0) {
      params = params.append('types', shopParams.types.join(','));
    }

    if(shopParams.sort){
      params = params.append('sort', shopParams.sort);
    }

    params = params.append('pageSize', 20);

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
