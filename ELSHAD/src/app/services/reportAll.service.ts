import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportAll } from '../model/reportAll';
import { ApiUrlsService } from './api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class ReportAllService {

  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }

  reportAll(): Observable<ReportAll[]> {
    return this.http.get<ReportAll[]>(`${this.baseUrl}/Report/GetAll`);
  }

  getDate(startDate: string, endDate: string): Observable<ReportAll[]>{
    return this.http.get<ReportAll[]>(`${this.baseUrl}/Report/GetAll?startDate=${startDate}&endDate=${endDate}`);
  }
}
