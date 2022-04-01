import { BrokerItem } from './../model/broker-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlsService } from './api-urls.service';
import { UserCompanyName } from '../model/userCompanyNameModel';


@Injectable({
  providedIn: 'root'
})

export class AccountService{
  baseUrl!: string;
  crmApiUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getAuthAPiURI();
    this.crmApiUrl = apiUrlService.getCrmAPIURI();
  }

  getUserCompanyName(): Observable<UserCompanyName> {
    return this.http.get<UserCompanyName>(this.crmApiUrl + '/TerminalOrder/GetUserCompanyName');
  }

  getUser(uId:number){
    return this.http.get<any>(this.baseUrl + '/Account/getuserbyid?id='+uId);
  }
  updateProfile(model:any){
    model.UPhone = `${model.UPhone}`;
    return this.http.put(this.baseUrl + '/Account/UpdateUser',model);
  }

  // updateUserNormal(userData: UserData) {
  //   return this.http.put(this.baseUrl + '/Account/UpdateUserNormal', userData);
  // }

  getFile(uId:number){
    return this.http.get<any>(this.baseUrl + '/Account/getfile?id='+uId);
  }

  uploadFile(fileData: FormData,UId:number){
    return  this.http.put(this.baseUrl + '/Account/updatefile?Uid='+UId,fileData);
  }
  sendNot(model:any):Observable<any>{
    return  this.http.post<any>(this.baseUrl + '/Account/SendNotification',model);
  }
  updatePassword(model:any){
    return  this.http.put(this.baseUrl + '/Account/UpdatePassword',model);
  }

  getNotById(id:number){
    return this.http.get<any>(this.baseUrl + '/Account/GetNotifications?id='+id);
  }

}

interface UserData {
  UId: number;
  USubtype: number;
  UVoen: string;
  UCustname: string;
  UPersonname: string;
  UPersonsurname: string;
  UPhone: string;
  FileIds: number[];
}
