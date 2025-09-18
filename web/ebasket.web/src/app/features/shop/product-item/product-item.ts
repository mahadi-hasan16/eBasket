import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { MatCard, MatCardActions, MatCardContent } from "@angular/material/card";
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-product-item',
  imports: [MatCard, MatCardContent, CurrencyPipe, MatCardActions, MatButton, MatIconModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css'
})
export class ProductItem {
  @Input() product?: Product;
}
