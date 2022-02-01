import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { TITLE } from 'src/utils/contants';
import { Title } from '@angular/platform-browser';
import { NotRezidentUser } from 'src/app/model/NotRezidentUser';
import { RezidentUser } from 'src/app/model/rezidentUser';

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

  public isNameSelected: boolean = true;
  public resPers: boolean = true;

  selectInput(event: any) {
    const selected = event.target.value;
    if (selected == 1) {
      this.isNameSelected = true;
    } else {
      this.isNameSelected = false;
    }
  }

  rezidentPerson(event: any){
    const selected = event.target.value;
    if (selected == 1) {
      this.resPers = true;
    } else {
      this.resPers = false;
    }
    console.log(this.resPers)
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
    if(!(data.value.UPassword == data.value.confirmPassword)){
      this.checkPsw = true;
      return;
     }else{
      //  console.log(data.value)
      //  throw 'fefefef';
      this.CreateUser(data.value);
     }


  }
  public sum:number=0;
  CreateUser(value: any) {
    const handleError = (err: any) => {
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
    }
    const handleSucces = (res: any) => {
      localStorage.setItem('uId', res.data.uId);
          this.router
            .navigate(['/verify']);
    }

    this.sum++;

    value.USubtype = value.USubtype == '' ? 2 : value.USubtype;
    if(!this.resPers) {
      const userData: NotRezidentUser = {
        name: value.Uname,
        surname: value.Usurname,
        username: value.UUsername,
        email: value.UEmailRes,
        fin: value.UFinRes,
        password: value.UPassword,
        telehpone: value.UPhoneRes,
      } 
      this.auhtService.registerNotRezidentUser(userData).subscribe({
        next: handleSucces, 
        error: handleError
      })
      return;
    }
    
    const userData: RezidentUser = {
      UVoen: value.UVoen,
      UCustname: value.UCustname,
      UPersonname: value.UPersonname,
      UPersonsurname: value.UPersonsurname,
      UPhone: value.UPhone,
      UEmail: value.UEmail,
      UPassword: value.UPassword,
      UTerms: value.UTerms,
      FIN: value.FIN,
    }
    this.auhtService.register(userData).subscribe( {
        next: handleSucces, 
        error: handleError
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
    }, (err: { error: { programMessage: any; }; }) => {
      Swal.fire({
        icon: 'error',
        title: 'Xəta',
        text: err.error.programMessage
      });
    });
  }
}
