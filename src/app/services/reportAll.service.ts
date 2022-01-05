import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReportAll } from '../model/reportAll';


const baseUrl = 'https://localhost:44323/api/Report/GetAll';

@Injectable({
  providedIn: 'root'
})
export class ReportAllService {

  constructor(private http: HttpClient) { }


  reportAll(): Observable<ReportAll[]> {
    return this.http.get<ReportAll[]>(baseUrl);
  }

  getDate(startDate: string, endDate: string): Observable<ReportAll[]>{
    return this.http.get<ReportAll[]>(`${baseUrl}?startDate=${startDate}&endDate=${endDate}`);
  }
}
