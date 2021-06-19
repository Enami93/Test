import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from '../../../shared/services/electron.services';


@Component({
  selector: 'app-canvas',
  templateUrl: './images-canvas.component.html',
  styleUrls: ['./images-canvas.component.scss']
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild('myCanvas', {static: false}) canvasEl!: ElementRef;
  public context: CanvasRenderingContext2D | any;
  scrHeight: number = 100;
  scrWidth: number = 90;
  
  constructor(private electronService: ElectronService) {
    
  }
  
  ngOnInit(): void {
  }
  
  /**
   * wait to load the template
   * create the element ref for the canvas
   */
  ngAfterViewInit(): void {
    this.context = this.canvasEl.nativeElement.getContext('2d');
    this.draw();  
  }

   /**
   * Just some code to test the canvas
   */
    private draw() {
      this.context.font = "30px Arial";
      this.context.textBaseline = 'middle';
      this.context.textAlign = 'center';
  
      const x = (this.canvasEl.nativeElement as HTMLCanvasElement).width / 2;
      const y = (this.canvasEl.nativeElement as HTMLCanvasElement).height / 2;
      this.context.fillText("AKKA", x, y);
  }
  load() {
    this.electronService.loadImage();
  }
}
