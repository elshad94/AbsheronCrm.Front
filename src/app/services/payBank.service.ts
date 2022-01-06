import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PayBank } from '../model/payBank';

const baseUrl = 'https://localhost:44323/api/Payment/PayBank';

@Injectable({
    providedIn: 'root'
})
export class PayBankService {
    isPaymentSuccesfull = false;

    constructor(private http: HttpClient) { }

    payBankMet(payBank: PayBank): Observable<PayBank> {
        return this.http.post<PayBank>(baseUrl, payBank);

    }
}
