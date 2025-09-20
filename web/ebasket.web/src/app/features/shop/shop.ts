import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop-service';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProductItem } from "./product-item/product-item";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialog } from './filters-dialog/filters-dialog';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-shop',
  imports: [MatCardModule, MatButtonModule, AsyncPipe, ProductItem, MatIconModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop implements OnInit {
  private dialogService = inject(MatDialog);
  private shopService = inject(ShopService);
  products$!: Observable<Product[]>;
  selectedBrands: string[] = [];
  selectedTypes: string[] = []; 
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

  openFilterDialog(){
    const dialogRef = this.dialogService.open(
      FiltersDialog,
      {
        minWidth: '500px',
        data: {
          selectedBrands: this.selectedBrands,
          selectedTypes: this.selectedTypes
        }
      });

      dialogRef.afterClosed()
      .subscribe(
        {
          next: result =>{
          if(result)
          {
            console.log(result);
            this.selectedBrands = result.selectedBrands;
            this.selectedTypes = result.selectedTypes;

            console.log(this.selectedBrands);
            console.log(this.selectedTypes);

            this.products$ = this.shopService.getProducts(this.selectedBrands, this.selectedTypes).pipe(
              map(response => response.data)
            );
          }
        }
        }
      );
  }
}
