import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PayBank } from '../model/payBank';
import { ApiUrlsService } from './api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class PayBankService {
  isPaymentSuccesfull = false;

  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }


  payBankMet(payBank: PayBank): Observable<PayBank> {
    return this.http.post<PayBank>(`${this.baseUrl}/Payment/PayBank`, payBank);

  }
}
