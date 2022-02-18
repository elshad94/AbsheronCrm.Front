import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import logger from 'src/utils/logger';
import Swal from 'sweetalert2';
import { TITLE } from 'src/utils/contants';
import { Title } from '@angular/platform-browser';
import { getFileName } from 'src/utils/fileNameGetter';
import { FileService } from 'src/app/services/file.service';
import * as saveAs from 'file-saver';
import { successAlert } from 'src/utils/alerts';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.scss'],
})
export class ProfileAccountComponent implements OnInit {
  constructor(
    private accountService: AccountService,
    private titleService: Title,
    private fileService: FileService,) {}

  public submitted=false;
  public model: any;
  public pathReyester?: number;
  public pathEtibar?: number;
  public pathBank?: number;
  public selectedFile!: File;
  public fileList?: any = [];
  public typeList?: any = [];
  public fileInput1Label = '';
  public fileInput2Label = '';
  public fileInput3Label = '';

  public fileApiUrl = 'http://localhost:4200/'
  ngOnInit(): void {
    this.titleService.setTitle(`Profil Hesabı${TITLE}`);
    this.accountService.getUser(Number(localStorage.getItem('Userid'))).subscribe((response) => {
      this.model = response;
      this.loadFile();
    });
  }

  openFile(id?: number) {
    if(!id) return;
    this.fileService.getFile(id).subscribe((response: any) => {
      const blob = new Blob([response], { type: response.type });
      saveAs(blob);
    });
  }

  loadFile() {
    this.accountService.getFile(Number(localStorage.getItem('Userid'))).subscribe((res: string | any[]) => {
      console.log(res)
      for (let index = 0; index < res.length; index++) {
        if (res[index].fileType == 12) {
          this.fileInput2Label = getFileName(res[index].fileUrl)
          this.pathBank = res[index].fileId;
          console.log(this.pathBank)
        }
        if (res[index].fileType == 13) {
          this.pathEtibar = res[index].fileId;
          this.fileInput3Label = getFileName(res[index].fileUrl)
          console.log(this.pathEtibar)

        }
        if (res[index].fileType == 14) {
          this.pathReyester = res[index].fileId;
          this.fileInput1Label = getFileName(res[index].fileUrl)

        }
      }
    });
  }

  OnSubmit(user: any) {
    this.submitted = true;
    logger.info(user.value);
    logger.info(user.valid);
    if(!user.valid) {
      return;
    }
    this.model = user.value;
    this.model.uId = Number(localStorage.getItem('Userid'));
    this.changeUser(user.value);
  }


  changeUser(value:any){
    value.USubtype = value.USubtype == '' ? 2 : value.USubtype;

    this.accountService.updateProfile(value).subscribe((response: any) => {

      this.OnUpload(Number(localStorage.getItem('Userid')));
      Swal.fire('Yadda saxlanıldı!', 'Məlumatlar yadda saxlanıldı', 'success');
      this.accountService
        .getUser(Number(localStorage
          .getItem('Userid')))
        .subscribe((response: any) =>
        {
          this.model = response;
          this.loadFile();
        });
    },(err: any) =>{
      Swal.fire({
        icon: 'error',
        title:'Xəta',
        text: 'Serverdə hər hansı bir xəta baş verdi',
      });
    });
  }

  // uploadOneFile(event: any, cusType: number) {
  //   this.selectedFile = <File>event
  //     .target
  //     .files[0];
  //   this.fileService.createUserFile(this.selectedFile, cusType)
  //     .subscribe({
  //       next: () => successAlert('Fayl yüklənildi', 'Uğurlu'),
  //       error: () => {
  //         Swal.fire({
  //           icon: 'error',
  //           title:'Xəta',
  //           text: 'Serverdə hər hansı bir xəta baş verdi',
  //         });
  //       }
  //     });
  // }

  uploadFile(event: any, type: number) {
    this.selectedFile = <File>event
      .target
      .files[0];
    this.typeList.push(type.toString());
    switch(type) {
      case 1:
        // this.fileInput1Label = this.selectedFile.name;
        this.fileInput1Label = this.selectedFile.name.substring(0, 43);
        break;
      case 2:
        // this.fileInput2Label = getFileName(this.selectedFile.name);
        this.fileInput2Label = this.selectedFile.name.substring(0, 43);
        break;
      case 3:
        // this.fileInput3Label = getFileName(this.selectedFile.name);
        this.fileInput3Label = this.selectedFile.name.substring(0, 43);
        break;
      }


    this.fileList.push(<File>event.target.files[0]);
  }


  OnUpload(uId: number) {
    const fileData = new FormData();
    for (let i = 0; i < this.fileList.length; i++) {
      fileData.append(
        this.typeList[i],
        this.fileList[i],
        this.fileList[i].name
      );
    }

    this.accountService
      .uploadFile(fileData, uId)
      .subscribe(() => {
      });
  }

  phoneInput(event: any) {
    var x = event.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
    event.target.value = !x[2] ? x[1] :  x[1]  + (x[2] ? '-' + x[2] : '') + (x[3] ? '-' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
  }
}
