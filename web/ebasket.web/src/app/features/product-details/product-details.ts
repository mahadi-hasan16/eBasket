import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop-service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDividerModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  private shopService = inject(ShopService);
  private activatedRoute = inject(ActivatedRoute);
  private changeDetectionRef = inject(ChangeDetectorRef)

  product?: Product;

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(!id)
      return;

    this.shopService.getProduct(+id).subscribe({
      next: product => 
        {
          this.product = product;
          this.changeDetectionRef.detectChanges();
        }
    })
  }
}
