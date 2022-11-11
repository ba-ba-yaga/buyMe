import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddFormComponent } from 'src/app/forms/add-form/add-form.component';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public searchKey: string = '';

  constructor(
    private cartService: CartService,
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(AddFormComponent);
  }

  search(event: any) {
    this.searchKey = (event.target as HTMLInputElement).value;
    this.api.search.next(this.searchKey);
  }
}
