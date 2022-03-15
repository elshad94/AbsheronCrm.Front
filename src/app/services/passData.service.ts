import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import AsanLoginRequestData from '../model/asanLoginRequsetData';
import { PayMethod } from '../model/payMethod';

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

  payMet: PayMethod[] = [{
    value: '',
    text: ''
  }]
  constructor() { }



}
