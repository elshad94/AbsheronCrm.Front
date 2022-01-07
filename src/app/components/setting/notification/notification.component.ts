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
  
  public model?:any =[]
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
      this.accountService.getNotById(Number(localStorage.getItem("token"))).subscribe((res)=> {
        console.log(res)
        this.model=res;
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
