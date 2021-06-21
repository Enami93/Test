import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../../shared/services/electron.services';
import { fromEvent } from 'rxjs';

import { Subject } from 'rxjs';
import * as fs from 'fs';

@Component({
  selector: 'app-canvas',
  templateUrl: './images-canvas.component.html',
  styleUrls: ['./images-canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas', {static: false}) canvasEl!: ElementRef;
  public context: CanvasRenderingContext2D | any;
  scrHeight: number = 50;
  scrWidth: number = 90;
  img: HTMLImageElement;
  fs = window.require('fs');
  selectedFile = new Subject<any>();

  constructor(private electronService: ElectronService) {}
  
  ngOnInit(): void {
    // subscribe 
    this.selectedFile.subscribe(input => {
      if(input) {
        this.fs.writeFile('src/assets/imgs/fileName.png', input, 'base64', function(err) {});
      }
    });
   
  }
  
  /**
   * wait to load the template
   * create the element ref for the canvas
   */
  ngAfterViewInit(): void {
    this.context = this.canvasEl.nativeElement.getContext('2d');
    const path = 'src/assets/imgs/fileName.png';
    this.img = new Image(); // Create a new Image
    this.img.src = 'assets/imgs/fileName.png';
    
    this.fs.access(path, this.fs.F_OK, (err) => {
      if (err) {
        console.error(err)
        return
      }
      this.context.canvas.width = this.img.naturalWidth;
      this.context.canvas.height = this.img.naturalHeight;
      this.context.drawImage(this.img, 0, 0, this.img.naturalWidth, this.img.naturalHeight);
    })

    // listen the the event click on the canvas
    fromEvent(this.canvasEl.nativeElement, 'click').subscribe(() => this.zoom());

  }

  /**
   * use the electron service to load one image from system
   */
  load() {
    this.electronService.loadImage(this.selectedFile);
  }
  /**
   * Apply zoom 2x (in our case) on the selected image
   */
  zoom(scaleParam?) {
    const scale = 2;
  
    // calculate new height and width
    this.context.canvas.width = this.img.naturalWidth * scale;
    this.context.canvas.height = this.img.naturalHeight * scale;

    // apply the scale zoom
    this.context.scale(2, 2);
    this.context.drawImage(this.img, 0, 0);
  }
}
