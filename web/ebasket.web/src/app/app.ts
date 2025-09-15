import { Component, inject, OnInit } from '@angular/core';
import { Header } from './layout/header/header';
import { Product } from './shared/models/product';
import { Shop } from './core/services/shop';

@Component({
  selector: 'app-root',
  imports: [Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  
  private shopService = inject(Shop);
  products: Product[] = [];

  ngOnInit(): void {
    this.shopService.getProducts()
    .subscribe({
      next: response => {
        this.products = response.data;
        console.log(this.products);
      },
      error: (error: any) => console.log(error),
    });
  }
  
}
