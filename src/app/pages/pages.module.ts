import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { routing } from './pages.routing';
import { SharedModule } from '../../shared/shared.module';

import { PagesComponent } from './pages.component';
import { CanvasComponent } from './images-canvas/images-canvas.component';

const components = [PagesComponent, CanvasComponent];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        routing
    ],
    declarations: [...components],
    exports: [...components],
    entryComponents: []
})
export class PagesModule {}
