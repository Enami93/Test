import { Component, ElementRef, ViewChild } from '@angular/core';


@Component({
  selector: 'app-canvas',
  templateUrl: './images-canvas.component.html',
  styleUrls: ['./images-canvas.component.scss']
})
export class CanvasComponent {
  @ViewChild('myCanvas', {static: false}) canvasEl!: ElementRef;
  public context: CanvasRenderingContext2D | any;
  scrHeight: number =  500;
  scrWidth: number = 500;


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
}
