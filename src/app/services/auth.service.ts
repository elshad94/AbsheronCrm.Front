import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public headers?: HttpHeaders ;
  
  baseUrl:string = "https://localhost:44383/api/Account/"
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders({'Content-Type': 'application/json'})
   }

  register(model:any){
    return this.http.post<any>(this.baseUrl,model);
  }

  login( model: any){
    return this.http.post<any>(this.baseUrl+"signin",model);
    
  }

  uploadFile(fileData: FormData,UId:number){
    return  this.http.post(this.baseUrl+"UploadFile?Uid="+UId,fileData)
  }

  sendEmail(){
    var UId:number = Number(localStorage.getItem('uId')?.toString()) 
    return this.http.post(this.baseUrl+"SendEmail",UId)
  }

  chagePass(){
    return this.http.post(this.baseUrl+"forgotpassword","fs")
  }

  updatePass(model:any){
    console.log(model)
    return this.http.post(this.baseUrl+"ChangePass",model)
  }
}
