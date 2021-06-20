import { Injectable } from '@angular/core';


import { ipcRenderer, webFrame, ipcMain} from 'electron';
import * as remote from '@electron/remote';
import * as childProcess from 'child_process';
import * as fs from 'fs';

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
  loadImage() {
    console.log("here", this.ipcRenderer);
      this.remote.dialog.showOpenDialog({
        properties: ['openFile'], 
        filters: [{ name: 'Images', extensions: ['jpg', 'png', 'gif']}]
      }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        this.fs.readFile(result.filePaths[0], function(err, data) { 
          console.log(data)
      })
    
      })
    }
}

    // Change how to handle the file content
  
  // (files) => {
  //   console.log(files);
  //       if(!files) return; 
  //       const file = files[0];
  //       this.fs.readFile(file, (err, data) => {
  //         console.log("Asynchronous read: " + data.toString());
  //       })
  //      });

  

  
