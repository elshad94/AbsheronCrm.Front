import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import logger from 'src/utils/logger';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public model: any = {};
  public submitted = false;
  public selectedFile! :File;
  public arr: File[] = [];

  constructor(private auhtService: AuthService,
    private router: Router)
  {


  }
  ngOnInit(): void {
  }




  public isNameSelected?: boolean;
  selectInput(event:any) {
    const selected = event.target.value;
    if (selected == 1) {
      this.isNameSelected = true;
    } else {
      this.isNameSelected = false;
    }
  }
  public fileList?:any = [];
  public typeList?:any =[];
  uploadFile(event:any,type:number){
    this.selectedFile =<File>event.target.files[0];
    this.typeList.push(type.toString());
    this.fileList.push(<File>event.target.files[0]);

  }

  OnSubmit(data:any){
    this.submitted = true;
    if(!data.valid) {
      return;
    }
    this.CreateUser(data.value);

  }

  CreateUser(value:any){
    value.USubtype = value.USubtype=='' ? 2 :  value.USubtype;
    this.auhtService
      .register(value)
      .subscribe( res=>{
        localStorage.setItem('uId', res.data.uId);
        this.OnUpload(res.data.uId);

      },err=>{
        if(err.error.data == '1')
          Swal.fire({
            icon: 'error',
            title:'Xəta',
            text: 'Serverdə hər hansı bir xəta baş verir',
          });
        else{
          Swal.fire({
            icon: 'error',
            title:'Xəta',
            text: err.error.programMessage
          });
        }
      });
  }

  OnUpload(uId:number){
    const fileData = new FormData();
    for (let i = 0; i < this.fileList.length; i++) {
      fileData
        .append(
          this.typeList[i],
          this.fileList[i],
          this.fileList[i].name
        );
    }
    this.auhtService.uploadFile(fileData,uId).subscribe(() =>{
      console.log('success');
      this.router
        .navigate(['/verify']);
    },err =>{
      Swal.fire({
        icon: 'error',
        title:'Xəta',
        text: err.error.programMessage
      });
    });
  }
}
