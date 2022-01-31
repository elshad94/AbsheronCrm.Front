import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LoginRequestData from '../model/loginRequestData';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ApiUrlsService } from './api-urls.service';
import { NotRezidentUser } from '../model/NotRezidentUser';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public headers?: HttpHeaders ;

  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getAuthAPiURI();
  }

  registerNotRezidentUser(userData: NotRezidentUser) {
    return this.http.post<any>(this.baseUrl + '/Account/signupNotRezident', userData);
  }

  register(model:any){
    return this.http.post<any>(this.baseUrl+'/Account/signup',model);
  }

  login( model: any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'/Account/SignIn',model);

  }

  uploadFile(fileData: FormData,UId:number){
    return  this.http.post(this.baseUrl+'/Account/UploadFile?Uid='+UId,fileData);
  }

  sendEmail(){
    const UId = Number(localStorage.getItem('uId')?.toString());
    return this.http.post(this.baseUrl+'/Account/SendEmail',UId);
  }

  chagePass(email:string){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post(this.baseUrl+'/Account/forgotpassword', {email}, httpOptions);
  }

  updatePass(model:any){
    return this.http.post(this.baseUrl+'/Account/ChangePass',model);
  }

  logout(){
    return this.http.get(this.baseUrl+'/Account/LogOut');
  }
}
