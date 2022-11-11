import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
    console.log(this.cartItemList);
  }

  addToCart(produxt: any) {
    this.cartItemList.push(produxt);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();

    console.log(this.cartItemList);
  }
  updateCartItem(id: number, item: any) {}
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((item: any) => {
      grandTotal += item.total;
    });
    console.log(grandTotal);

    return grandTotal;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((item: any, index: number) => {
      if (product.id === item.id) this.cartItemList.splice(index, 1);
    });
    this.productList.next(this.cartItemList);
  }

  removeAllItem() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
