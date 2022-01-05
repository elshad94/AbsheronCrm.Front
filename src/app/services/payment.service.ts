import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payments } from '../model/payments';
const baseUrl = 'https://localhost:44323/api/Payment/GetAll';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

constructor(private http: HttpClient) { }

payAll(): Observable<Payments[]> {
  return this.http.get<Payments[]>(baseUrl);
}

}
