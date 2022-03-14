import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payments } from '../model/payments';
import { ApiUrlsService } from './api-urls.service';
const baseUrl = 'https://localhost:44323/api/Payment/GetAll';

interface AddBalanceDTO {
  isBrokerBalance: boolean,
  amount: number
}

interface AddBalanceResult {
  blogId: number,
  url: string
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  blogId?: number;
  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }

  payAll(): Observable<Payments[]> {
    return this.http.get<Payments[]>(`${this.baseUrl}/Payment/GetAll`);
  }

  addBalance(balanceDTO: AddBalanceDTO): Observable<AddBalanceResult> {
    return this.http
      .post<AddBalanceResult>(`${this.baseUrl}/Payment/AddBalance`, balanceDTO);
  }

  confirmAddBalance(isErrorPage: boolean = false) {
    this.http
      .get(`${this.baseUrl}/Payment/AddBalanceCallback?blogId=${this.blogId}$isErrorPage=${isErrorPage}`);
  }

  getUserBalance(): Observable<GetUserBalanceDTO> {
    return this.http
      .get<GetUserBalanceDTO>(`${this.baseUrl}/Payment/GetUserBalance`);
  }

}

interface GetUserBalanceDTO {
  brokerBalance: number;
  terminalBalance: number;
}
