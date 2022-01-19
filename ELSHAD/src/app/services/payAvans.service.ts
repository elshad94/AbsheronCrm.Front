import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PayAvans } from '../model/payAvans';
import { ApiUrlsService } from './api-urls.service';


@Injectable({
  providedIn: 'root'
})
export class PayAvansService {
  isPaymentSuccesfull = false;

  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }

  payAvansMet(payAvans: PayAvans): Observable<PayAvans> {
    return this.http.post<PayAvans>(`${this.baseUrl}/Payment/PayAvans`, payAvans );
  }

}
