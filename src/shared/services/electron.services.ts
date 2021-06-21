import { Injectable } from '@angular/core';


import { ipcRenderer, webFrame, ipcMain} from 'electron';
import * as remote from '@electron/remote';
import * as childProcess from 'child_process';
import * as fs from 'fs';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  
  ipcRenderer: typeof ipcRenderer;
  ipcMain: typeof ipcMain;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.ipcMain = window.require('electron').ipcMain;
      this.webFrame = window.require('electron').webFrame;

      // If you want to use remote object in renderer process, please set enableRemoteModule to true in main.ts
      this.remote = window.require('@electron/remote');
      // console.log('remote - globalShortcut', this.remote.globalShortcut);

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');
    }
  }
  /**
   * load only image and update value of selected image
   */
  loadImage(selectedFile: Subject<any>){
  //  console.log(this.remote.dialog);
   return this.remote.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif'] }]
    }).then(data => {
        this.fs.readFile(data.filePaths[0],  {encoding: 'base64'}, function (err, data) {
        selectedFile.next(data);
       });

    });
  }

}

  

  
