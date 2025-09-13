import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './layout/header/header';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

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
  products: any[] = [];

  ngOnInit(): void {
    this.http.get<any>(this.baseUrl+'products')
    .subscribe({
      next: (response: any) => {
        this.products = response.data;
        console.log(this.products);
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('Completed!')
    });
  }
  
}
