import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LoginRequestData from '../model/loginRequestData';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ApiUrlsService } from './api-urls.service';
import { NotRezidentUser } from '../model/NotRezidentUser';
import { RezidentUser } from '../model/rezidentUser';
import AsanLoginRequestData from '../model/asanLoginRequsetData';
import AsanLoginResponceData from '../model/asanLoginResponceData';
import CertificateLogin from '../model/certificateLogin';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public headers?: HttpHeaders ;

  baseUrl!: string;
  asanUrl: string = 'http://89.147.203.85:7090/api/Account'
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getAuthAPiURI();
  }

  registerNotRezidentUser(userData: NotRezidentUser) {
    return this.http.post<any>(this.baseUrl + '/Account/signupNotRezident', userData);
  }

  register(model: RezidentUser){
    return this.http.post<any>(this.baseUrl+'/Account/signup',model);
  }

  login( model: any):Observable<any>{
    return this.http.post<any>(this.baseUrl+'/Account/SignIn',model);

  }

  aslogin(asandata: AsanLoginRequestData): Observable<AsanLoginResponceData> {
    return this.http.post<AsanLoginResponceData>(this.asanUrl + '/Login' , asandata).pipe(
    )
  }

  asloginStat(asanStat: AsanLoginResponceData): Observable<any> {
    return this.http.post<any>(this.asanUrl + '/StatusCheck' , asanStat).pipe(
    )
  }

  asanCertificate(asanCertificate: AsanLoginRequestData): Observable<any> {
    return this.http.post<any>(this.asanUrl + '/CerifcateList' , asanCertificate).pipe(
    )
  }

  certifcateLogin(certificateLogin: CertificateLogin): Observable<any> {
    return this.http.post<any>(this.asanUrl + '/CertifcateLogin' , certificateLogin).pipe(
    )
  }

  certifcateStatusCheck(certifcateStatusCheck: any): Observable<any> {
    return this.http.post<any>(this.asanUrl + '/CertifcateStatusCheck' , certifcateStatusCheck).pipe(
    )
  }

  checkvoen(checkvoen: string): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/Account/checkvoen' , checkvoen).pipe(
    )
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
