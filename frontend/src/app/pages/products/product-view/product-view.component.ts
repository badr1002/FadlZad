import { UserService } from 'src/app/pages/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/pages/products/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  images: any = []
  loading: boolean = false
  responsiveOptions: any = []
  product: any
  user:any
  constructor(private _productService: ProductService, private _route: ActivatedRoute,private _user:UserService) {
    let productId = this._route.snapshot.params['id']
    this._productService.getProductById(productId).subscribe(
      (productResponse) => {
        if (productResponse.apiStatus) {
          this._user.getUserById(productResponse.data.uploadedWith.userId).subscribe(
            (userResponse) => {
              this.product = productResponse.data
              this.images = productResponse.data.images;
              this.user = userResponse.data
              this.loading = false
            }, (err) => {
              this.loading = true
            }
          )         
        }
      },
      (err) => {
        this.loading = true
      },
      () => {
        this.loading = false
      }
    )
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }



  ngOnInit(): void {
  }

}
