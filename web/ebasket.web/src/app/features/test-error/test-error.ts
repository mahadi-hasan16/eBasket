import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.html',
  styleUrl: './test-error.css',
  imports: [MatButtonModule]
})
export class TestError {
  baseUrl = environment.baseUrl;

  private httpClient = inject(HttpClient);

  getError404() {
    return this.httpClient.get(this.baseUrl + 'buggy/notfound')
      .subscribe({
        next: response => {
          console.log(response);
          document.getElementById('error')!.textContent = response ? response.toString() : 'No error';
        },
        error: error => {
          console.log(error);
          document.getElementById('error')!.textContent = error ? error.message.toString() : 'No error';
        }
      })
  }

  getError400() {
    return this.httpClient.get(this.baseUrl + 'buggy/badrequest')
      .subscribe({
        next: response => {
          console.log(response);
          document.getElementById('error')!.textContent = response ? response.toString() : 'No error';
        },
        error: error => {
          console.log(error);
          document.getElementById('error')!.textContent = error ? error.message.toString() : 'No error';
        }
      })
  }

  getError401() {
    return this.httpClient.get(this.baseUrl + 'buggy/unauthorized')
      .subscribe({
        next: response => {
          console.log(response);
          document.getElementById('error')!.textContent = response ? response.toString() : 'No error';
        },
        error: error => {
          console.log(error);
          document.getElementById('error')!.textContent = error ? error.message.toString() : 'No error';
        }
      })
  }

  getError500() {
    return this.httpClient.get(this.baseUrl + 'buggy/internalerror')
      .subscribe({
        next: response => {
          console.log(response);
          document.getElementById('error')!.textContent = response ? response.toString() : 'No error';
        },
        error: error => {
          console.log(error);
          document.getElementById('error')!.textContent = error ? error.message.toString() : 'No error';
        }
      })
  }

  getError400Validation() {
    return this.httpClient.get(this.baseUrl + 'buggy/validationerror')
      .subscribe({
        next: response => {
          console.log(response);
          document.getElementById('error')!.textContent = response ? response.toString() : 'No error';
        },
        error: error => {
          console.log(error);
          document.getElementById('error')!.textContent = error ? error.message.toString() : 'No error';
        }
      })
  }
}
