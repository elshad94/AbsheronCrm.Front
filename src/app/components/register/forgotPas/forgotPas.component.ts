import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import logger from 'src/utils/logger';
import { errorAlert } from 'src/utils/alerts';

@Component({
  selector: 'app-forgotPas',
  templateUrl: './forgotPas.component.html',
  styleUrls: ['./forgotPas.component.scss']
})
export class ForgotPasComponent implements OnInit {
  public submitted: boolean =false;
  public email:string="";
  constructor(private authService:AuthService, private router: Router ){

  }

  ngOnInit() {
  }

  SendCode(){
    this.submitted = true;
        if(this.email=='' || !(this.email.includes("@"))) {
            return;
        }

    this.authService.chagePass(this.email).subscribe({
      next: () => {
        this.router.navigate(['verify']);
      },
      error: (res) => errorAlert(res.error.programMessage, 'Uğursuz')
    })
  }
}
