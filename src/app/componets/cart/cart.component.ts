import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grandTotal!: number;

  constructor(private cartService: CartService, private api: ApiService) {}

  ngOnInit(): void {
    this.api.refresh$.subscribe(() => {
      this.cartService.getProducts().subscribe((response) => {
        this.products = response;
        this.grandTotal = this.getTotalPrice();
      });
    });
    this.cartService.getProducts().subscribe((response) => {
      this.products = response;
      this.grandTotal = this.getTotalPrice();
    });
    console.log(this.products);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.products.map((item: any) => {
      grandTotal += item.total;
    });

    return grandTotal;
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item.id);
  }

  clearCart() {
    this.cartService.removeAllItem();
  }
}
