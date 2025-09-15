import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product';
import { ShopService } from '../../core/services/shop-service';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shop',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Shop implements OnInit {
  private shopService = inject(ShopService);
  private cdr = inject(ChangeDetectorRef); // ← ADD THIS
  products: Product[] = [];
  ngOnInit(): void {
    this.shopService.getProducts()
    .subscribe({
      next: response => {
        this.products = response.data;
        console.log(this.products);
        this.cdr.detectChanges();
      },
      error: error => console.log(error)
    })
  }
}
