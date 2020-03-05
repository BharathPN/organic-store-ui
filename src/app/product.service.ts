import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Product } from './products/product';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl + 'api/products';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + 'Product')
      .pipe(
        tap(_ => this.log('fetched Products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
