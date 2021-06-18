import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './images-canvas/images-canvas.component';

import { PagesComponent } from './pages.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children:[
      { path: 'pages', component: CanvasComponent },
    ]

  }
];
export const routing = RouterModule.forChild(pagesRoutes);
