import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop-service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductItem } from "./product-item/product-item";

@Component({
  selector: 'app-shop',
  imports: [MatCardModule, MatButtonModule, AsyncPipe, ProductItem],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Shop implements OnInit {
  private shopService = inject(ShopService);
  products$!: Observable<Product[]>;
  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop(){
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.products$ = this.shopService.getProducts().pipe(
      map(response => response.data)
    );
  }
}
