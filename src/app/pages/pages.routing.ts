import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';

const pagesRoutes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,


  }
];
export const routing = RouterModule.forChild(pagesRoutes);
