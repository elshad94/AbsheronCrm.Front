import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payments } from '../model/payments';
import { ApiUrlsService } from './api-urls.service';

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
  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }

  payAll(): Observable<Payments[]> {
    return this.http.get<Payments[]>(`${this.baseUrl}/Payment/GetAll`);
  }

  postVoen(voen: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/Payment/GetPayType?voen=${voen}`);
  }

  addBalance(balanceDTO: AddBalanceDTO): Observable<AddBalanceResult> {
    return this.http
      .post<AddBalanceResult>(`${this.baseUrl}/Payment/AddBalance`, balanceDTO);
  }

  confirmAddBalance(paymentKey: string, isErrorPage: boolean = false): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/Payment/AddBalanceCallback?paymentKey=${paymentKey}&isErrorPage=${isErrorPage}`);
  }

  getUserBalance(): Observable<GetUserBalanceDTO> {
    return this.http
      .get<GetUserBalanceDTO>(`${this.baseUrl}/Payment/GetUserBalance`);
  }

  getUserBalances(): Observable<GetUserBalancesDTO[]> {
    return this.http
      .get<GetUserBalancesDTO[]>(`${this.baseUrl}/Payment/GetUserBalances`);
  }

  payCard(orderType: number, orderId: number, amount: number): Observable<any> {
      return this.http
        .post<any>(`${this.baseUrl}/Payment/PayCard`, {
          'orderType': orderType,
          'orderId': orderId,
          'amount': amount
        });
  }
}

interface GetUserBalancesDTO {
  date: string,
  operation: string,
  amount: number,
  isOut: boolean
}

interface GetUserBalanceDTO {
  brokerBalance: number;
  terminalBalance: number;
}
