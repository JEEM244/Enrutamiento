import { Routes } from '@angular/router';

import { Admin } from './admin/admin';
import { ProductList } from './admin/product-list/product-list';
import { UserList } from './admin/user-list/user-list';
import { Details } from './details/details';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'details/:id', component: Details },
  {
    path: 'admin',
    component: Admin,
    children: [
      { path: 'users', component: UserList },
      { path: 'products', component: ProductList },
    ],
  },
];
