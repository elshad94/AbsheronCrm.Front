import { HelpPostItem } from './../../model/help-post-item.model';
import {  EmailTypes } from './../../model/HelpRequestBody';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import HelpRequestBody from 'src/app/model/HelpRequestBody';
import { HelpService } from 'src/app/services/help.service';
import { errorAlert, successAlert } from 'src/utils/alerts';
import {Title} from "@angular/platform-browser";
import logger from 'src/utils/logger';
import { TITLE } from 'src/utils/contants';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {
  emailSubject:any;
  emailType: any = [];
  emailText:any;

  email: HelpRequestBody = {
    complainType:-1,
    emailSubject: '',
    emailType: [],
    emailText: ''
  };
 helpPostItem: HelpPostItem = {
  emailSubject: '',
  complainType: 0,
  emailText: ''
   };
  public resType: boolean = true;

  constructor(
      private helpService: HelpService,
      private router: Router,
      private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(`Kömək${TITLE}`)
    this.getItem();
  }
  getItem(){
    this.helpService.getItem().subscribe((res) => {


      this.emailType=res;

      this.emailSubject=res.emailSubject;
      this.emailText=res.emailText;


    });
  }
  typeProblem(event: any) {
    const selected = event.target.value;
    this.resType = selected == 1;
  }
  clearFilters() {
debugger;
    this.email.emailSubject = '';
    this.email.emailText = '';
    this.email.emailType=[];
    this.email.complainType=-1;

    }
sendEmail1(data:any){
  debugger
this.helpPostItem.complainType=Number(
  this.email.complainType
);
this.helpPostItem.emailSubject=this.email.emailSubject;
this.helpPostItem.emailText=this.email.emailText;
  if(this.helpPostItem.emailSubject.trim().length === 0 ) {
    errorAlert('Mövzunu daxil edin', 'Uğursuz');
    return;
  }
  if(this.email.emailText.trim().length === 0 ) {
    errorAlert('Sorğunuzu daxil edin', 'Uğursuz');
    return;
  }
  this.helpService.sendEmail(this.helpPostItem).subscribe({
    next: (response: any) => {
      successAlert('Sorğunuz göndərildi', 'Uğurlu')
this.clearFilters();
      if (response) {
        this.router.navigate(['/help']);
      }
    },
    error: error => {
      console.error(error);

      const errMsg = error.error.error;
      switch (error.status) {
        case 400:
          errorAlert(errMsg, 'Error!')
          break;
        case 500:
          errorAlert('Server problemi', 'Error!')
          break;
        default:
          errorAlert('ERROR', 'ERROR')
      }
    }
  })
}

// CreateHelp(value:any){

//   const helpData: HelpRequestBody= {
//     emailSubject:value.emailSubject,
//     emailType:value.emailType,
//     emailText:value.emailText
//   }

//   helpData.emailSubject=this.email.emailSubject;
// helpData.emailText=this.email.emailText;
//   this.helpService.sendEmail(helpData).subscribe({
//     next: () => {
//       successAlert('Sualınız göndərildi', 'Uğurlu').then(res => {
//         if(res.isConfirmed) {
//           this.router.navigate(['/home']);
//         }
//       });
//     },
//     error: err => {

//     }
//   });
// }

}
