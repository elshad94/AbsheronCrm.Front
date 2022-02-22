import { Component, OnInit } from '@angular/core';
import { TITLE } from 'src/utils/contants';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifTexts = [
    'Bütün uğurlu əməliyyatlar haqqında məlumat almaq istəyirəm',
    'Bütün uğursuz əməliyyatlar haqqında məlumat almaq istəyirəm',
    'Bütün əməliyyatlar haqqında məlumat almaq istəyirəm',
    'Yeniliklər və dəyişikliklər haqqında məlumat almaq istəyirəm',
    'Sistemə daxil olmalar haqqında məlumat almaq istəyirəm'
  ];

  public model?:any =[];
  constructor(private accountService:AccountService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle(`Bildirişlər${TITLE}`);
    this.accountService.getNotById(Number(localStorage.getItem('Userid'))).subscribe((res)=> {
      this.model=res;
    });
  }


  sendNot(){
    this.accountService.sendNot(this.model).subscribe((res)=>{
      Swal.fire({
        icon: 'success',
        title: 'Yadda Saxlanildi',
      });
    },(err) =>{
      Swal.fire({
        icon: 'error',
        title:'Xəta',
        text: 'Serverdə hər hansı bir xəta baş verid',
      });
    });
  }

}
