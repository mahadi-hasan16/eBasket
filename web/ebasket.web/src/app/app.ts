import { Component } from '@angular/core';
import { Header } from './layout/header/header';
import { Shop } from './features/shop/shop';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Shop],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App  {}
