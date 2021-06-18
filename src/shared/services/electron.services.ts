import { Injectable } from '@angular/core';

//const electron=<any>window;
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  
  constructor() {}


  
}