import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MallListComponent } from './features/malls/mall-list.component';
import { ShopListComponent } from './features/shops/shop-list.component';
import { LoginComponent } from './features/auth/login.component';
import { AdminHomeComponent } from './features/admin/components/admin-home/admin-home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'malls', component: MallListComponent },
  { path: 'shops', component: ShopListComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  // Legacy aliases
  { path: 'core/mallslist', redirectTo: 'malls' },
  { path: 'core/shopslist', redirectTo: 'shops' },
  { path: 'auth', redirectTo: 'login' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
