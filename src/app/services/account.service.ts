import { BrokerItem } from './../model/broker-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })

  export class AccountService{
    constructor(private http: HttpClient) {
       
       }

    getUser(uId:number){
      return this.http.get<any>("https://localhost:44383/api/Account/getuserbyid?id="+uId)
    }
    updateProfile(model:any){
        return this.http.put("https://localhost:44383/api/Account/UpdateUser",model)
    }

    getFile(uId:number){
      return this.http.get<any>("https://localhost:44383/api/Account/getfile?id="+uId)
    }

    uploadFile(fileData: FormData,UId:number){
      return  this.http.put("https://localhost:44383/api/Account/updatefile?Uid="+UId,fileData)
    }
    sendNot(model:any):Observable<any>{
      console.log(model)
      return  this.http.post<any>("https://localhost:44383/api/Account/SendNotification",model)
    }
    updatePassword(model:any){
      return  this.http.put("https://localhost:44383/api/Account/UpdatePassword",model)
    }

    getNotById(id:number){
      return this.http.get<any>("https://localhost:44383/api/Account/GetNotifications?id="+78)
    }

  }