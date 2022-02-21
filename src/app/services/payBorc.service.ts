import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PayBorc } from '../model/payBorc';
import { ApiUrlsService } from './api-urls.service';


@Injectable({
  providedIn: 'root'
})


export class PayBorcService {
  isPaymentSuccesfull = false;

  baseUrl!: string;

constructor(private http: HttpClient,
            private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI()
   }

   payBorcMet(payBorc: PayBorc): Observable<PayBorc> {
    return this.http.post<PayBorc>(`${this.baseUrl}/Payment/PayDebtor`, payBorc );
  }

}
