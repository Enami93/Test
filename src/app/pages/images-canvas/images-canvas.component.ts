import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ElectronService } from "../../../shared/services/electron.services";
import { fromEvent } from "rxjs";

import { Subject } from "rxjs";
import * as fs from "fs";
import { BTN_ZOOM_TXT, BTN_DEZOOM_TXT, PATH_IMAGE} from "../../../shared/contants/constant.string";

@Component({
  selector: "app-canvas",
  templateUrl: "./images-canvas.component.html",
  styleUrls: ["./images-canvas.component.scss"],
})
export class CanvasComponent implements OnInit, AfterViewInit {
  @ViewChild("myCanvas", { static: false }) canvasEl!: ElementRef;
  public context: CanvasRenderingContext2D | any;
  scrHeight: number = 50;
  scrWidth: number = 90;
  img: HTMLImageElement;
  fs = window.require("fs");
  selectedFile = new Subject<any>();
  isZoom = false;
  btn_zoom: string = BTN_ZOOM_TXT;
  hide = true;
  constructor(private electronService: ElectronService) {}

  ngOnInit(): void {
    // subscribe if any file was selected and save it in the assets folder
    this.selectedFile.subscribe((input) => {
      if (input) {
        this.fs.writeFile(
          PATH_IMAGE,
          input,
          "base64",
          function (err) {}
        );
        // update the value
        this.selectedFile.next(null);
      }
    });
  }

  /**
   * wait to load the template
   * create the element ref for the canvas
   */
  ngAfterViewInit(): void {
    this.context = this.canvasEl.nativeElement.getContext("2d");
    const path = PATH_IMAGE;
    this.img = new Image(); // Create a new Image
    this.img.src = "assets/imgs/fileName.png";

    // check if there is an uploaded image in the assets
    this.fs.access(path, this.fs.F_OK, (err) => {
      if (err) {
        //if no
        console.error(err);
        return;
      }
      this.hide = false;
      // add the image to the canvas
      this.context.canvas.width = this.img.naturalWidth;
      this.context.canvas.height = this.img.naturalHeight;
      this.context.drawImage(
        this.img,
        0,
        0,
        this.img.naturalWidth,
        this.img.naturalHeight
      );
      this.context.save();
    });

    // listen the the event click on the canvas
    fromEvent(this.canvasEl.nativeElement, "click").subscribe(() =>
      this.zoom()
    );
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
  zoom() {
    if (!this.isZoom) {
      const scale = 2;
      // zoom in
      this.drawContents(scale);
    } else {
      //zoom out
      this.drawContents(1);
    }
    this.isZoom = !this.isZoom;
    return  this.btn_zoom = this.isZoom ? BTN_DEZOOM_TXT : BTN_ZOOM_TXT;
  }
  /**
   *
   * @param scale zoom scale
   * Add the image with the selected zoom in /zoom out
   */
  drawContents(scale) {
    //calculate the new mesure for the canvas (height and <width)
    var newWidth = this.context.canvas.width * scale;
    var newHeight = this.context.canvas.height * scale;

    this.context.canvas.width = this.img.naturalWidth * scale;
    this.context.canvas.height = this.img.naturalHeight * scale;

    // aply the zoom scale
    this.context.scale(scale, scale);

    this.context.clearRect(0, 0, newWidth, newHeight);
    this.context.drawImage(this.img, 0, 0);
  }

   /**
     * Display the cursor.
     * @param eMouseEvent
     * @param tooltipString tooltipMessage
     */
    displayCursorTooltip(e: MouseEvent, tooltipString: string) {
      if (!this.hide) {
        const x = e.x;
        const y = e.y;
        const tooltipElt = document.getElementById('tooltip-span');
        if (tooltipElt) {
            tooltipElt.innerHTML = tooltipString;
            tooltipElt.style.display = 'block';
            tooltipElt.style.top = y + 20 + 'px';
            tooltipElt.style.left = x + 20 + 'px';
            tooltipElt.style.position = 'fixed';
        }
      }
  }

      /**
     * hide the cursor.
     */
       hideCursorTooltipDeplacer() {
        if (this.hide) {
        const tooltipElt = document.getElementById('tooltip-span');
        if (tooltipElt) {
            tooltipElt.style.display = 'none';
        }
      }
    }


}
