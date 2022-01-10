import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LoginRequestData from '../model/loginRequestData';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public headers?: HttpHeaders ;

    baseUrl = 'https://localhost:44383/api/Account/';
    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders({'Content-Type': 'application/json'});
    }

    register(model:any){
        console.log(model);
        return this.http.post<any>(this.baseUrl+'signup',model);
    }

    login( model: any):Observable<any>{
        return this.http.post<any>(this.baseUrl+'SignIn',model);

    }

    uploadFile(fileData: FormData,UId:number){
        return  this.http.post(this.baseUrl+'UploadFile?Uid='+UId,fileData);
    }

    sendEmail(){
        const UId = Number(localStorage.getItem('uId')?.toString());
        return this.http.post(this.baseUrl+'SendEmail',UId);
    }

    chagePass(email:string){
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
        return this.http.post(this.baseUrl+'forgotpassword', {email}, httpOptions);
    }

    updatePass(model:any){
        console.log(model);
        return this.http.post(this.baseUrl+'ChangePass',model);
    }

    logout(){
        return this.http.get(this.baseUrl+'LogOut');
    }
}
