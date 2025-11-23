import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop-service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductItem } from "./product-item/product-item";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialog } from './filters-dialog/filters-dialog';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule, MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  imports: [
    MatCardModule,
    MatButtonModule,
    ProductItem,
    MatIconModule,
    MatMenuModule,
    MatSelectionList,
    MatListOption,
    MatPaginatorModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop implements OnInit {
  private router = inject(Router);

  private dialogService = inject(MatDialog);
  private shopService = inject(ShopService);
  private changeDetectionRef = inject(ChangeDetectorRef);
  products?: Pagination<Product>;
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low - High', value: 'priceAsc' },
    { name: 'Price: High - Low', value: 'priceDesc' },
  ]

  shopParams = new ShopParams();

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop() {
    this.shopService.getBrands();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams)
      .subscribe({
        next: response => {
          this.products = response;
          //console.log(this.products);
          this.changeDetectionRef.detectChanges();
          console.log(this.products);
          if (this.products?.count !== 0) {
            const filterElement = document.getElementById('shopFilter');
            if (filterElement) {
              filterElement.style.display = 'flex';
            }
          }
        },
        error: error => {
          console.log(error.message);
          this.router.navigate(['/server-error']);
        }
      })
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.shopParams.sort = selectedOption.value;
      this.shopParams.pageNumber = 1;
      this.getProducts();
    }
  }

  onSearchChange() {
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  openFilterDialog() {
    const dialogRef = this.dialogService.open(
      FiltersDialog,
      {
        minWidth: '500px',
        data: {
          selectedBrands: this.shopParams.brands,
          selectedTypes: this.shopParams.types
        }
      });

    dialogRef.afterClosed()
      .subscribe(
        {
          next: result => {
            if (result) {
              console.log(result);
              this.shopParams.brands = result.selectedBrands;
              this.shopParams.types = result.selectedTypes;
              this.shopParams.pageNumber = 1;

              this.getProducts();
            }
          }
        }
      );
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.pageNumber = event.pageIndex + 1;
    this.shopParams.pageSize = event.pageSize;
    this.getProducts();
  }

}
