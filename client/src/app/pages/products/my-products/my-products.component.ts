import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Product } from '../product';
import { ProductService } from '../product.service';
import * as async from 'async'

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

  @ViewChild('dt') dt: DataView | undefined;

  products: Product[];
  sortedProdect: Product[];

  sortCategoryOptions: SelectItem[];
  // dt: any;
  sortOrder: number;
  sortKey: any;
  sortField: string;
  count: number;
  rows: number = 9;
  first: number = 0;
  user: any
  alert: any
  msg: any
  loading: boolean = true
  constructor(
    private productService: ProductService,
    private primengConfig: PrimeNGConfig,
    private _route: Router

  ) {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
  ngOnInit() {
    this.productService.getAllProductByUserId().subscribe((res) => {
      if (res.apiStatus) {
        this.products = res.data;
        this.sortedProdect = this.products;
        this.productService.getAllCategories().subscribe(res => {
          if (res.apiStatus) {
            for (let cat of res.data) {
              this.sortCategoryOptions.push({ label: cat.name, value: cat.name })
            }
            this.loading = false

          }
        },
          (err) => {
            this.alert = 'danger';
            this.msg = err.error.msg;
            setTimeout(() => {
              this.msg = '';
            }, 2000);
          })
        this.loading = false
        setTimeout(() => {
          this.msg = '';
        }, 2000);
      }
    },
      (err) => {
        this.alert = 'danger';
        this.msg = err.error.msg;
        this.loading = true

        setTimeout(() => {
          this.msg = '';
        }, 2000);
      }
    );

    this.sortCategoryOptions = [
    ];

    this.primengConfig.ripple = true;
  }
  getTarget($event: any) {
    return $event.target.value;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
      this.sortedProdect = this.products;
      this.sortedProdect = this.sortedProdect.filter(a => a.type == value)
    }
  }
  deleteProduct(product: any) {
    if (confirm('Do you really want to delete this product?')) {
      this.productService.deleteProduct(product._id).subscribe((res) => {
        if (res.apiStatus) {

          let i = 1
          async.eachSeries(product.images, (image, next) => {
            this.productService.deleteProductImageCloud(product._id, image, i, (err: any, data: any) => {
              if (err) {
                this.alert = 'danger';
                this.msg = "Something Wrong!";
                this.loading = true
                setTimeout(() => {
                  this.msg = '';
                }, 2000);
              } else {
                i++
                next()
              }
            })
          }).then(() => {
            this.products = this.products.filter(a => a._id != product._id);
            this.sortedProdect = this.products;
            this.count = res.length;
            this.loading = false
          })
        }
      });
    }


  }

  openProductView(id: any) {
    this._route.navigateByUrl('/product/' + id)
  }

}
