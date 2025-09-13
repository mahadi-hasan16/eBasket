import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';

@Component({
  selector: 'app-root',
  imports: [Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ebasket.web');
  // private baseUrl = 'https://localhost:5065/api/';
  private baseUrl = environment.baseUrl;
  private http = inject(HttpClient);
  products: Product[] = [];

  ngOnInit(): void {
    this.http.get<Pagination<Product>>(this.baseUrl+'products')
    .subscribe({
      next: response => {
        this.products = response.data;
        console.log(this.products);
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('Completed!')
    });
  }
  
}
