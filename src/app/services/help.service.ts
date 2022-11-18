import { HelpPostItem } from './../model/help-post-item.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import HelpRequestBody from '../model/HelpRequestBody';
import { ApiUrlsService } from './api-urls.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }

  sendEmail(email: HelpPostItem): Observable<any> {
    return this.http.post(`${this.baseUrl}/Help`, email, {headers});
  }
  getItem(): Observable<any>{

    return this.http.get(`${this.baseUrl}/Help`);
  }
}
