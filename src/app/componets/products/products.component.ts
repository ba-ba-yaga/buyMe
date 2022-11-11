import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';
import { ViewComponent } from 'src/app/view/view/view.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: any;
  public filterCategory: any;
  searchKey: string = '';
  currentCart: any = [];
  constructor(
    private api: ApiService,
    private cartService: CartService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.api.refresh$.subscribe(() => {
      this.getAllProducts();
    });
    this.getAllProducts();
    this.api.search.subscribe((value: string) => {
      this.searchKey = value;
    });
  }
  getDisabled(status: string): boolean {
    if (status === 'Out of stock') {
      return true;
    }
    return false;
  }
  private getAllProducts() {
    this.api.getProducts().subscribe((response) => {
      this.productList = response;

      this.filterCategory = response;
      if (this.productList)
        this.productList.forEach((item: any) => {
          if (
            item.category === "women's clothing" ||
            item.category === "men's clothing"
          )
            item.category = 'fashion';
          Object.assign(item, { quantity: 1, total: item.price });
        });
    });
  }

  addToCart(item: any) {
    this.cartService.getProducts().subscribe((response) => {
      console.log(response, item);
      let grandTotal = 0;
      if (response) {
        response.map((item: any) => {
          grandTotal += item.total;
        });
        const availableItem = response.filter(
          (data: any) => item.id === data.id
        );
        console.log(availableItem);
        if (availableItem && availableItem.length) {
          console.log(availableItem);

          this.cartService.updateCartItem(item.id, {
            ...item,
            quantity: availableItem[0].quantity + 1,
            total: (availableItem[0].quantity + 1) * availableItem[0].price,
            grandTotal,
          });
        } else this.cartService.addToCart(item);
      } else {
        this.cartService.addToCart({
          ...item,
          grandTotal: grandTotal + item.price,
        });
      }
    });
  }

  openView(item: any) {
    this.dialog.open(ViewComponent, {
      width: '35%',
      data: item,
    });
  }

  filter(category: string) {
    this.filterCategory = this.productList.filter((item: any) => {
      if (item.category == category || category == '') {
        return item;
      }
    });
  }
}
