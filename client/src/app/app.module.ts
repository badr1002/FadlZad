import { AllProductsComponent } from './pages/admin/all-products/all-products.component';
import { AllUsersComponent } from './pages/admin/all-users/all-users.component';
import { DashNavComponent } from './pages/admin/layout/dash-nav/dash-nav.component';
import { LoadingPageComponent } from './helpers/loading-page/loading-page.component';
import { ChatComponent } from './helpers/chat/chat.component';
import { RegisterComponent } from './pages/user/regiser/regiser.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { AppRoutingModule } from './app-routing.module';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/user/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { DataViewModule } from 'primeng/dataview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { OrderListModule } from 'primeng/orderlist';
import { InterceptorInterceptor } from './providers/interceptor.interceptor'
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { CarouselComponent } from './pages/products/carousel/carousel.component';
import { GalleriaModule } from 'primeng/galleria';
import { DockModule } from 'primeng/dock';
import { AddNewProductComponent } from './pages/products/add-new-product/add-new-product.component';
import { UserService } from './pages/user/user.service';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule, } from 'ngx-bootstrap/tabs';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PageError404Component } from './helpers/page-error404/page-error404.component';
import { ForgetPasswordComponent } from './pages/user/forget-password/forget-password.component';
import { ErrorActivationComponent } from './helpers/error-activation/error-activation.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { ProductViewComponent } from './pages/products/product-view/product-view.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductService } from './pages/products/product.service';
import { MyProductsComponent } from './pages/products/my-products/my-products.component';
import { SearchProductsComponent } from './pages/products/search-products/search-products.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from '../environments/firebaseConfig';

 

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translate/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    AddNewProductComponent,
    PageError404Component,
    ForgetPasswordComponent,
    ErrorActivationComponent,
    ProfileComponent,
    ProductsComponent,
    ProductViewComponent,
    CarouselComponent,
    MyProductsComponent,
    SearchProductsComponent,
    DashboardComponent,
    ChatComponent,
    LoadingPageComponent,
    DashNavComponent,
    AllUsersComponent,
    AllProductsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    PaginatorModule,
    CardModule,
    DataViewModule,
    ButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    RatingModule,
    FormsModule,
    CarouselModule,
    GalleriaModule,
    DockModule,
    OrderListModule,
    FileUploadModule,
    NgxPaginationModule,
    TabsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,

  ],
  providers: [ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
    // UserService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
