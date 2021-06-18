import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AppComponent } from "./app.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/pages', pathMatch: 'full' },
  {
    path: '',
    component: AppComponent,
    loadChildren: () => import('./pages/pages.module').then(page => page.PagesModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
