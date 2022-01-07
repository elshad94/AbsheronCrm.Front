import { Component, OnInit } from '@angular/core';

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
    'Yemiliklər və dəyişikliklər haqqında məlumat almaq istəyirəm',
    'Sistemə daxil olmalar haqqında məlumat almaq istəyirəm'
  ]
  
  public model?:any =[]
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
      this.accountService.getNotById(Number(localStorage.getItem("Userid"))).subscribe((res)=> {
        console.log('model')
        this.model=res;
        console.log(this.model)
      })
  }

  
  sendNot(){
     this.accountService.sendNot(this.model).subscribe((res)=>{
      Swal.fire({
        icon: 'success',
        title: 'Yadda Saxlanildi',
      })
     },(err) =>{
      Swal.fire({
        icon: 'error',
        title:'Xəta',
        text: 'Serverdə hər hansı bir xəta baş verid',
      })
     })
  }
  
}
