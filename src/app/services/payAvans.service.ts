import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PayAvans } from '../model/payAvans';


const baseUrl = 'https://localhost:44323/api/Payment/PayAvans';


@Injectable({
  providedIn: 'root'
})
export class PayAvansService {

constructor(private http: HttpClient) { }

payAvansMet(payAvans: PayAvans): Observable<PayAvans> {
  return this.http.post<PayAvans>(baseUrl, payAvans );
}

}
