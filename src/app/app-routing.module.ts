import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'add-product',
    loadChildren: () => import('./pages/add-product/add-product.module').then( m => m.AddProductPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-list',
    loadChildren: () => import('./pages/product-list/product-list.module').then( m => m.ProductListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product-detail',
    loadChildren: () => import('./pages/product-detail/product-detail.module').then( m => m.ProductDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'alert-settings',
    loadChildren: () => import('./pages/alert-settings/alert-settings.module').then( m => m.AlertSettingsPageModule),
    canActivate: [AuthGuard]
  },
  
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'apirest',
    loadChildren: () => import('./pages/apirest/apirest.module').then( m => m.ApirestPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
