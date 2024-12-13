import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { TodoComponent } from './todo/todo/todo.component';
import { MiniWordComponent } from './directives/mini-word/mini-word.component';
import { ColorComponent } from './components/color/color.component';
import { FrontComponent } from './templates/front/front.component';
import { AdminComponent } from './templates/admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { NF404Component } from './components/nf404/nf404.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AddCvComponent } from './cv/add-cv/add-cv.component';
import { CvComponent } from './cv/cv/cv.component';
import { DetailsCvComponent } from './cv/details-cv/details-cv.component';
import { RhComponent } from './optimizationPattern/rh/rh.component';
import { TtcComponent } from './components/ttc/ttc.component';

export const routes: Route[] = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'rh',
    loadComponent: () =>
      import('./optimizationPattern/rh/rh.component').then(
        (m) => m.RhComponent
      ),
  },
  {
    path: 'ttc',
    loadComponent: () =>
      import('./components/ttc/ttc.component').then((m) => m.TtcComponent),
  },
  {
    path: 'cv',
    loadComponent: () =>
      import('./cv/cv/cv.component').then((m) => m.CvComponent),
  },
  {
    path: 'cv/add',
    loadComponent: () =>
      import('./cv/add-cv/add-cv.component').then((m) => m.AddCvComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'cv/:id',
    loadComponent: () =>
      import('./cv/details-cv/details-cv.component').then(
        (m) => m.DetailsCvComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./templates/front/front.component').then((m) => m.FrontComponent),
    children: [
      {
        path: 'todo',
        loadComponent: () =>
          import('./todo/todo/todo.component').then((m) => m.TodoComponent),
      },
      {
        path: 'word',
        loadComponent: () =>
          import('./directives/mini-word/mini-word.component').then(
            (m) => m.MiniWordComponent
          ),
      },
    ],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./templates/admin/admin.component').then((m) => m.AdminComponent),
    children: [
      {
        path: 'color',
        loadComponent: () =>
          import('./components/color/color.component').then(
            (m) => m.ColorComponent
          ),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/nf404/nf404.component').then(
        (m) => m.NF404Component
      ),
  },
];
