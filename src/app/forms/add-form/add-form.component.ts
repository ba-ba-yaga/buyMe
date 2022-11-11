import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit {
  avavilable = ['In stock', 'Out of stock'];
  productForm!: FormGroup;
  action: string = 'Add';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private editData: any
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      avavilable: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
    if (this.editData) {
      this.productForm.controls['productName'].setValue(
        this.editData.productName
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['avavilable'].setValue(
        this.editData.avavilable
      );
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['image'].setValue(this.editData.image);
      this.productForm.controls['description'].setValue(
        this.editData.description
      );
      this.action = 'Edit';
    }
  }
  customSnacbar: any = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'right',
  };

  addProduct() {
    if (this.productForm.valid) {
      if (!this.editData) {
        this.api
          .postProduct({ ...this.productForm.value, id: Math.random() })
          .subscribe({
            next: (res) => {
              this.snackbar.open('Product added', 'Close', this.customSnacbar);
              this.productForm.reset();
              this.api.getProducts();
            },
            error: () => {
              this.snackbar.open(
                'Somthing went wrong!!',
                'Close',
                this.customSnacbar
              );
            },
          });
      } else this.updateProduct(this.editData);
    }
  }

  updateProduct(data: any) {
    this.api.updateProduct(this.productForm.value, data.id).subscribe({
      next: (res) => {
        this.snackbar.open('Product Udated', 'Close', this.customSnacbar);
        this.productForm.reset();
        this.api.getProducts();
      },
      error: () => {
        this.snackbar.open(
          'Somthing went wrong!!',
          'Close',
          this.customSnacbar
        );
      },
    });
  }
}
