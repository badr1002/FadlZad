import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ProductService } from '../../products/product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
})
export class AllProductsComponent implements OnInit, AfterContentChecked {
  loading: boolean = false;
  limits: any[] = [5, 10, 20];
  p = 1;
  selectedLimit = 5;
  products: any[] = [];
  copyProducts: any[] = [];
  msg:any
  constructor(private _product: ProductService) {
    _product.getAllProductsForAdmin().subscribe(
      (res) => {
        this.products = res.data.reverse();
        this.copyProducts = this.products;
      },
      (err) => console.log(err.error),
      () => {
        this.loading = true;
      }
    );
  }
  addRouteForm = false;
  addRoute() {
    this.addRouteForm = true;
  }
   
  enCoded(id: any) {
    let encId = encodeURIComponent(btoa(id));
    // get id const dec = atob(decodeURIComponent(enc));
    return encId;
  }

  search_term: any;
  handleSearch() {
    let filterUsers = this.products.filter((u: any) =>
      u.name.includes(this.search_term)
    );
    this.products = filterUsers;
  }
  ngAfterContentChecked() {
    if (this.search_term == '') {
      this.products = this.copyProducts;
    }
  }

  deleteProduct(id: any) {
    if (confirm('Do you really want to delete this product?')) {
      this._product.deleteProduct(id).subscribe(
        (res): any => {
          if (res.apiStatus) {
            return (this.products = this.products.filter((p) => p._id !== id));
          }
        },
        (err) => alert(err.error.msg)
      );
    }
  }
  enableProduct(id: any) {
    this._product.enableProduct(id).subscribe(
      (res) => {
        if (res.apiStatus) {
          for (let user of this.products) {
            if (user._id == id) user.status = true;
          }
          this.msg = res.msg
        }
      },
      (err) => (this.msg = err.error)
    );
  }
  disableProduct(id: any) {
    this._product.disableProduct(id).subscribe(
      (res) => {
        if (res.apiStatus) {
          for (let user of this.products) {
            if (user._id == id) user.status = false;
          }
          this.msg = res.msg;
        }
      },
      (err) => (this.msg = err.error)
    );
  }

  convertDate(date: Date) {
  var d = new Date(date),
    dformat =
      [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('/') +
      ' ' +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    return dformat;
  }
  ngOnInit(): void {}
}
