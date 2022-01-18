import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

    this.authService.chagePass(this.email).subscribe((res: any) =>{
        this.router.navigate(['verify']);
    })
  }
}
