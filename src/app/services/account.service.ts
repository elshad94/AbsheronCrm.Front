import { BrokerItem } from './../model/broker-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlsService } from './api-urls.service';


@Injectable({
  providedIn: 'root'
})

export class AccountService{
  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getAuthAPiURI();
  }

  getUser(uId:number){
    return this.http.get<any>(this.baseUrl + '/Account/getuserbyid?id='+uId);
  }
  updateProfile(model:any){
    return this.http.put(this.baseUrl + '/Account/UpdateUser',model);
  }

  getFile(uId:number){
    return this.http.get<any>(this.baseUrl + '/Account/getfile?id='+uId);
  }

  uploadFile(fileData: FormData,UId:number){
    return  this.http.put(this.baseUrl + '/Account/updatefile?Uid='+UId,fileData);
  }
  sendNot(model:any):Observable<any>{
    console.log(model);
    return  this.http.post<any>(this.baseUrl + '/Account/SendNotification',model);
  }
  updatePassword(model:any){
    return  this.http.put(this.baseUrl + '/Account/UpdatePassword',model);
  }

  getNotById(id:number){
    return this.http.get<any>(this.baseUrl + '/Account/GetNotifications?id='+id);
  }

}
