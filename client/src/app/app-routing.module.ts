import { AdminGuard } from './guards/admin.guard';
import { AllUsersComponent } from './pages/admin/all-users/all-users.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SearchProductsComponent } from './pages/products/search-products/search-products.component';
import { MyProductsComponent } from './pages/products/my-products/my-products.component';
import { ProductViewComponent } from './pages/products/product-view/product-view.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { ErrorActivationComponent } from './helpers/error-activation/error-activation.component';
import { ForgetPasswordComponent } from './pages/user/forget-password/forget-password.component';
import { PageError404Component } from './helpers/page-error404/page-error404.component';
import { AuthGuard } from './guards/auth.guard';
 
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/regiser/regiser.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AddNewProductComponent } from './pages/products/add-new-product/add-new-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  {
    path: 'user',
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgetPassword', component: ForgetPasswordComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'product/:id', component: ProductViewComponent },
  { path: 'add-new-ads', component: AddNewProductComponent, canActivate: [AuthGuard] },
  { path: 'my-ads', component: MyProductsComponent, canActivate: [AuthGuard] },
  { path: 'search/:search_term', component: SearchProductsComponent },
  { path: 'activationError', component: ErrorActivationComponent },
  {
    path: 'dashboard', component: DashboardComponent , canActivate: [AdminGuard]
  },
  { path: '**', component: PageError404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
