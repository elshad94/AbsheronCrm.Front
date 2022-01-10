import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotPas',
  templateUrl: './forgotPas.component.html',
  styleUrls: ['./forgotPas.component.scss']
})
export class ForgotPasComponent implements OnInit {

  constructor(private authService:AuthService, private router: Router ){ 
   
  }
  public email:string="";
  ngOnInit() {
  }
  
  SendCode(){
    console.log("salama")
    this.authService.chagePass(this.email).subscribe((res: any) =>{
        this.router.navigate(['verify']);
    })
  }
}
