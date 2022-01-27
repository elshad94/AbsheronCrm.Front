import { fileDetails } from './../model/broker-request.model';
import { BrokerItem } from './../model/broker-item';
import { HttpClient, HttpHeaders ,HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrokerRequestItem } from '../model/broker-request.model';
import { BrokerPostItem } from '../model/broker-post-item.model';
import { ApiUrlsService } from './api-urls.service';

@Injectable({
  providedIn: 'root',
})
export class BrokerItemService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }
  getBrokerItem(): Observable<BrokerItem[]> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    console.log('test');
    return this.http.get<BrokerItem[]>(this.baseUrl + '/BrokerList');
  }
  deleteBrokerItem1(item:BrokerItem[] = []) {
    console.log(item);
    return this.http.delete(`${this.baseUrl}/Broker?id=${item}`);
  }
  updateBrokerItem1(id:any):Observable<BrokerRequestItem> {
    return this.http.get<BrokerRequestItem>(this.baseUrl + '/Broker/'+id);
  }
  updateBrokerSave(id:any ,data: BrokerPostItem):Observable<any> {
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    data.notes = data.notes?.trim();
    data.TransportNumber = data.TransportNumber.trim();
    return this.http.put(this.baseUrl + '/Broker/'+id ,data);

  }
  getBrokerCreate(): Observable<any>{
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    return this.http.get(this.baseUrl + '/Broker');
  }
  postBrokerCreateFile(data:fileDetails): Observable<any>{
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    return this.http.post(this.baseUrl+ '/File',{
      fileDetails: [
        {
          fileId: data.fileId,
          docTypeId:data.documentTypeId,
        },
      ],
    });
  }
  postBrokerItem(data: BrokerPostItem): Observable<HttpResponse<unknown>>{
    data.notes = data.notes?.trim();
    data.TransportNumber = data.TransportNumber.trim();
    return this.http.post( `${this.baseUrl}/Broker`,
      JSON.stringify(data),
      {
        observe: 'response'
      }
    );
  }

  postBrokerItemSave(data: BrokerPostItem):Observable<HttpResponse<any>> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    data.notes = data.notes?.trim();
    data.TransportNumber = data.TransportNumber.trim();
    return this.http.post(
      `${this.baseUrl}/Broker`,
      data,
      {
        observe: 'response',
        headers
      }
    );
  }
}

