import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AddFormComponent } from 'src/app/forms/add-form/add-form.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  public selectedItem: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) private selected: any,
    private dialogRef: MatDialogRef<ViewComponent>,
    private diolog: MatDialog,
    private api: ApiService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.selectedItem = this.selected;
  }
  closeDialoge() {
    this.dialogRef.close();
  }

  customSnackbar: any = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  };

  editProduct() {
    this.dialogRef.close();
    this.diolog.open(AddFormComponent, {
      data: this.selectedItem,
    });
  }
  deleteProduct(id: number) {
    this.api.deleteProduct(id).subscribe({
      next: () => {
        this.snackbar.open('Product added', 'Close', this.customSnackbar);
        this.api.getProducts();
      },
      error: () => {
        this.snackbar.open(
          'Somthing went wrong!!',
          'Close',
          this.customSnackbar
        );
      },
    });
  }
}
