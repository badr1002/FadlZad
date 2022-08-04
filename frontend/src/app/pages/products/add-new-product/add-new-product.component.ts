import { ProductService } from 'src/app/pages/products/product.service';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit {
  disableSubmit: boolean = false
  msg: any;
  alert: any;
  allCategories: [] = []
  addCategoryStatus: boolean = false
  selectedCategory: any
  file: any;
  fileName: any
  imageSrc: string;
  images: any = []
  cloudImages: any = []
  uploadedFiles: any[] = [];
  isAdmin: boolean = false
  constructor(private _productService: ProductService) {
    this.isAdmin = JSON.parse(localStorage.getItem('user'))?.isAdmin ? true : false
  }
  ngOnInit(): void {
    this.getAllCategories()
  }


  ngAfterContentChecked() {
    if (this.product.valid) {
      this.disableSubmit = false
    } else {
      this.disableSubmit = true
    }
  }
  product = new FormGroup({
    category: new FormGroup({
      catName: new FormControl('', [Validators.required]),
      catDescription: new FormControl(''),

    }),
    categoryName: new FormControl('', [Validators.required]),
    p_name: new FormControl('', [Validators.required]),

    p_description: new FormControl(''),
  });



  get _getProduct() {
    return {
      name: this.product.get('p_name').value,
      categoryName: this.product.get('categoryName').value,

      description: this.product.get('p_description').value,
      category: {
        name: this.product.controls['category'].get('catName')?.value,
        description: this.product.controls['category'].get('catDescription')?.value,
      },
    }
  }
  onFileSelected(e: any) {
    this.images.push(e.target.files[0])
  }

  getAllCategories() {
    this._productService.getAllCategories().subscribe(res => {
      if (res.apiStatus) {
        this.allCategories = res.data
      }
    },
      (err) => {
        this.alert = 'danger';
        this.msg = err.error.msg;
        setTimeout(() => {
          this.msg = '';
        }, 2000);
      })
  }
  showAddCategoryField() {
    this.addCategoryStatus = true
  }
  cancelCategoryAddation() {
    this.addCategoryStatus = false
  }
  addCategory(e: any) {
    e.preventDefault();
    this._productService.addCategory(this._getProduct.category).subscribe(res => {
      if (res.apiStatus) {
        this.alert = 'success';
        this.msg = res.msg;
        setTimeout(() => {
          this.msg = '';
          this.addCategoryStatus = false
          this.product.controls['category'].get('catName').setValue('')
          this.product.controls['category'].get('catDescription').setValue('')
          this.getAllCategories()
        }, 2000);
      }
    },
      (err) => {
        this.alert = 'danger';
        this.msg = err.error.data;
        setTimeout(() => {
          this.msg = '';
        }, 2000);
      })
  }

  addProduct(e: any) {
    e.preventDefault();
    if (!this._getProduct.name) {
      this.alert = 'danger';
      this.msg = "Product name required!";
      setTimeout(() => {
        this.msg = '';
      }, 2000);
      return
    }
    if (!this._getProduct.categoryName) {
      this.alert = 'danger';
      this.msg = "Please select an category!";
      setTimeout(() => {
        this.msg = '';
      }, 2000);
      return
    }
    this._productService.addProduct(this._getProduct).subscribe(res => {
      if (res.apiStatus) {
        let i = this.images.length
        for (let image of this.images) {
          this._productService.uploadProductImagesCloud(image, res.data._id, i, (err: any, data: any) => {
            if (!err) {
              this.cloudImages.push(data)
              i--
              if (i === 0) {
                let product = res.data
                product.images = this.cloudImages
                this._productService.editProduct(product).subscribe(
                  res => {
                    if (res.apiStatus) {
                      this.alert = 'success';
                      this.msg = res.msg;
                      setTimeout(() => {
                        this.msg = '';
                        this.product.controls['p_name'].setValue('')
                        this.product.controls['categoryName'].setValue('')
                        this.product.controls['p_description'].setValue('')
                        this.product.controls['category'].get('catName').setValue('')
                        this.product.controls['category'].get('catDescription').setValue('')
                        this.images = []
                      }, 2000);
                    }
                  }
                )
              }
            }
          })
        }
      }
    })

  }
}
