import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeNGConfig, SelectItem } from 'primeng/api';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

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
  alert: any
  msg: any
  loading: boolean = true
  constructor(
    private productService: ProductService,
    private primengConfig: PrimeNGConfig,
    private _route: ActivatedRoute,
    private route: Router

  ) {
  }
  ngOnInit() {
    this.productService.searchProductByName(this._route.snapshot.params['search_term']).subscribe((res) => {
      if (res.apiStatus) {
        this.products = res.data;
        this.sortedProdect = this.products;
        this.productService.getAllCategories().subscribe(res => {
          if (res.apiStatus) {
            for (let cat of res.data) {
              this.loading = false

              this.sortCategoryOptions.push({ label: cat.name, value: cat.name })
            }
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
      { label: "All Categories", value: null }
      
    ];

    this.primengConfig.ripple = true;
  }
  getTarget($event: any) {
    return $event.target.value;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (!value) {
      this.sortedProdect = this.products
    }
    else if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
      this.sortedProdect = this.products;
      this.sortedProdect = this.sortedProdect.filter(a => a.type == value)
    }
  }
  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe((res) => {
      if (res.apiStatus) {
        this.products = this.products.filter(a => a._id != id);
        this.count = res.length;
        this.loading = false
      }
    },
      (err) => {
        this.loading = true
      },
      () => {
        this.loading = false
      }
    );
  }

  openProductView(id: any) {
    this.route.navigateByUrl('/product/' + id)
  }
}
