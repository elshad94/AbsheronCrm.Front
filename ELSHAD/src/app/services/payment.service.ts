import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payments } from '../model/payments';
import { ApiUrlsService } from './api-urls.service';
const baseUrl = 'https://localhost:44323/api/Payment/GetAll';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }

  payAll(): Observable<Payments[]> {
    return this.http.get<Payments[]>(`${this.baseUrl}/Payment/GetAll`);
  }

}
