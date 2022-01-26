import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { TITLE } from 'src/utils/contants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle(`Təsdiqlə${TITLE}`);
  }

  sendAgain(){
    this.authService.sendEmail().subscribe((res)=>{
      console.log(res)
    },(err) => {
      Swal.fire({
        icon: 'error',
        title:'Xəta',
        text: 'Mail göndərilə bilmədi zəhmət olmasa təkrar göndərin',
      })
    })
  }

  backPage(){

  }

}
