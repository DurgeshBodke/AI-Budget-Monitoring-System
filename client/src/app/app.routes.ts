import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth-guard';

import { Login } from './layouts/login/login';
import { Dashboard } from './layouts/dashboard/dashboard';
import { Departments } from './features/departments/departments';
import { Budgets } from './features/budgets/budgets';
import { Expenses } from './features/expenses/expenses';
import { Alerts } from './features/alerts/alerts';
import { Reports } from './features/reports/reports';
import { Users } from './features/users/users';

export const routes: Routes = [

  {
    path: '',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'departments',
    component: Departments,
    canActivate: [authGuard]
  },

  {
    path: 'budgets',
    component: Budgets,
    canActivate: [authGuard]
  },

  {
    path: 'expenses',
    component: Expenses,
    canActivate: [authGuard]
  },

  {
    path: 'alerts',
    component: Alerts,
    canActivate: [authGuard]
  },

  {
    path: 'reports',
    component: Reports,
    canActivate: [authGuard]
  },

  {
    path: 'users',
    component: Users,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: ''
  }

];