import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit,Input } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() numVisible:number
  products: Product[];
  responsiveOptions: any = [];
  loading:boolean = true
  constructor(private productService: ProductService, private _route:Router) {
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
  openProductView(id: any) {
    this._route.navigateByUrl('/product/' + id)
  }
  ngOnInit(): void {
    this.productService.getLast10Products().subscribe((res) => {
      if (res.apiStatus) {
        this.products = Array.from(res.data);       
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
}
