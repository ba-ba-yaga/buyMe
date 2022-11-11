import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, BehaviorSubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public search = new BehaviorSubject<string>('');
  public endPoint = 'https://buyme-76218-default-rtdb.firebaseio.com/';

  private _refresh$ = new Subject<void>();

  public get refresh$(): any {
    return this._refresh$;
  }

  constructor(private http: HttpClient) {}

  postProduct(data: any) {
    return this.http.post<any>(this.endPoint + 'products.json', data).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  getProducts() {
    return this.http.get<any>(this.endPoint + 'products.json').pipe(
      map((response: any) => {
        const productArray = [];
        for (let key in response) {
          productArray.push(response[key]);
        }
        return productArray;
      })
    );
  }
  updateProduct(data: any, id: number) {
    return this.http.put<any>(this.endPoint + 'products.json', data);
  }
  deleteProduct(id: number) {
    return this.http.delete<any>(this.endPoint + 'products.json');
  }

  addToCart(item: any) {
    return this.http.post<any>(this.endPoint + 'cart.json', item).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  getCartItems() {
    return this.http.get<any>(this.endPoint + 'cart.json').pipe(
      map((response: any) => {
        const cartArray = [];
        for (let key in response) {
          cartArray.push(response[key]);
        }
        return cartArray;
      })
    );
  }
  updateCart(item: any, id: number) {
    return this.http.put<any>(this.endPoint + 'cart.json', item).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
  deleteCartItem(id: number) {
    return this.http.post<any>(this.endPoint + 'cart.json', id).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}
