import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.scss'],
})
export class ProfileAccountComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  public submitted=false;
  public model: any;
  public pathReyester!: string;
  public pathEtibar!: string;
  public pathBank!: string;
  public selectedFile!: File;
  public fileList?: any = [];
  public typeList?: any = [];
  ngOnInit(): void {
    this.accountService.getUser(Number(localStorage.getItem('Userid'))).subscribe((response) => {
      this.model = response;
      this.loadFile();
    });
  }

  loadFile() {
    this.accountService.getFile(Number(localStorage.getItem('Userid'))).subscribe((res) => {

      for (let index = 0; index < res.length; index++) {
        if (res[index].fileType == 12) {
          this.pathBank = 'https://localhost:44383' + res[index].fileUrl;
        }
        if (res[index].fileType == 13) {
          this.pathEtibar = 'https://localhost:44383' + res[index].fileUrl;
        }
        if (res[index].fileType == 14) {
          this.pathReyester = 'https://localhost:44383' + res[index].fileUrl;
        }
      }
    });
  }

  OnSubmit(user: any) {
    this.submitted = true;

    if(!user.valid) {
      return;
    }
    this.model = user.value;
    this.model.uId = Number(localStorage.getItem('Userid'));
    this.changeUser(user.value);
  }


  changeUser(value:any){
    this.accountService.updateProfile(value).subscribe((response) => {

      this.OnUpload(Number(localStorage.getItem('Userid')));
      Swal.fire('Yadda saxlanıldı!', 'Məlumatlar yadda saxlanıldı', 'success');
      this.accountService
        .getUser(Number(localStorage
          .getItem('Userid')))
        .subscribe((response) =>
        {
          this.model = response;
          this.loadFile();
        });
    },err =>{
      Swal.fire({
        icon: 'error',
        title:'Xəta',
        text: 'Serverdə hər hansı bir xəta baş verdi',
      });
    });
  }

  uploadFile(event: any, type: number) {
    this.selectedFile = <File>event
      .target
      .files[0];
    this.typeList.push(type.toString());

    this.fileList.push(<File>event.target.files[0]);
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
}
