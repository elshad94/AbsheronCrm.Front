import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConWag } from '../model/conWag';
import { HttpClient } from '@angular/common/http';
import { ApiUrlsService } from './api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class OrderCountService {

  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }

  getOrdersCount(): Observable<ConWag[]> {
    return this.http.get<ConWag[]>(this.baseUrl + '/TerminalOrder' + '/GetOrderCounts');
  }
}
