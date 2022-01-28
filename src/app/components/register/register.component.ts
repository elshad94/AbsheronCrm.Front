import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { TITLE } from 'src/utils/contants';
import { Title } from '@angular/platform-browser';
import logger from 'src/utils/logger';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public model: any = {};
  public submitted = false;
  public selectedFile!: File;
  public arr: File[] = [];
  public fileInput1Label = '';
  public fileInput2Label = '';
  public fileInput3Label = '';
  public checkPsw:boolean=false;



  constructor(private auhtService: AuthService,
    private router: Router,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`Qeydiyyatdan Keç${TITLE}`);
  }

  phoneInput(event: any) {
    var x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
    event.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
  }

  public isNameSelected?: boolean;
  selectInput(event: any) {
    const selected = event.target.value;
    if (selected == 1) {
      this.isNameSelected = true;
    } else {
      this.isNameSelected = false;
    }
  }
  public fileList?: any = [];
  public typeList?: any = [];
  uploadFile(event: any, type: number) {
    this.selectedFile = <File>event.target.files[0];
    switch (type) {
      case 1:
        this.fileInput1Label = this.selectedFile.name.substring(0, 43);
        break;
      case 2:
        this.fileInput2Label = this.selectedFile.name.substring(0, 43);
        break;
      case 3:
        this.fileInput3Label = this.selectedFile.name.substring(0, 43);
        break;
    }
    this.typeList.push(type.toString());
    this.fileList.push(<File>event.target.files[0]);
  }

  OnSubmit(data: any) {
    this.submitted = true;
    if (!data.valid) {
      return;
    }
    if(!(data.value.UPassword== data.value.confirmPassword)){
      this.checkPsw = true;
      return;
     }else{
      this.CreateUser(data.value);
     }


  }
  public sum:number=0;
  CreateUser(value: any) {
    this.sum++;
    console.log(this.sum);
    value.USubtype = value.USubtype == '' ? 2 : value.USubtype;
    this.auhtService
      .register(value)
      .subscribe(res => {

        localStorage.setItem('uId', res.data.uId);

        this.router
          .navigate(['/verify']);
        // this.OnUpload(res.data.uId);
      }, err => {

        if (err.error.data == '1')
          Swal.fire({
            icon: 'error',
            title: 'Xəta',
            text: 'Serverdə hər hansı bir xəta baş verir',
          });
        else {
          Swal.fire({
            icon: 'error',
            title: 'Xəta',
            text: err.error.programMessage
          });
        }
      });
  }

  OnUpload(uId: number) {
    const fileData = new FormData();
    for (let i = 0; i < this.fileList.length; i++) {
      fileData
        .append(
          this.typeList[i],
          this.fileList[i],
          this.fileList[i].name
        );
    }
    this.auhtService.uploadFile(fileData, uId).subscribe(() => {
      this.router
        .navigate(['/verify']);
    }, err => {
      Swal.fire({
        icon: 'error',
        title: 'Xəta',
        text: err.error.programMessage
      });
    });
  }
}
