import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import AsanLoginRequestData from '../model/asanLoginRequsetData';

@Injectable({
  providedIn: 'root'
})
export class PassDataService {
  data: AsanLoginRequestData = {
    phone: '',
    userId: ''
  };
  dataRegister: any = {
    FIN: '',
    UCustname: '',
    UVoen: '',
    USubtype: '',
  }
  constructor() { }



}
