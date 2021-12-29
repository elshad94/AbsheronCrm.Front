import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConWag } from '../model/conWag';
import { HttpClient } from '@angular/common/http';
const baseUrl = 'https://localhost:44323/api/TerminalOrder';

@Injectable({
  providedIn: 'root'
})


export class OrderCountService {

  constructor(private http: HttpClient) { }

  getOrdersCount(): Observable<ConWag[]> {
    return this.http.get<ConWag[]>(baseUrl + '/GetOrderCounts');
  }
}
