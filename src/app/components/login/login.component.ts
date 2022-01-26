import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import logger from 'src/utils/logger';
import LoginRequestData from 'src/app/model/loginRequestData';
import { errorAlert } from 'src/utils/alerts';
import { SpinnerService } from 'src/app/services/spinner.service';
import { GlobalService } from 'src/app/services/global.service';
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginRequestData: LoginRequestData = {
    uEmail: '',
    uPassword: ''
  };

  constructor(private authService: AuthService,
              private router: Router,
              private globalService: GlobalService,
              private titleService: Title) {
                this.titleService.setTitle("Login  | Abşeron Logistika Mərkəzi")
  }

  ngOnInit(): void {
    this.titleService.setTitle("Login | Abşeron Logistika Mərkəzi")
  }

  getDecodedAccessToken(token?: any): any {
    try{
      return jwt_decode(token?.toString());
    }
    catch(Error){
      return null;
    }
  }

  signin() {

    this.authService.login(this.loginRequestData).subscribe({
      next: (res: any) => {
        // localStorage.setItem('token', res.data);
        this.globalService.token = res.data;
        localStorage.setItem('Userid',this.getDecodedAccessToken(res.data.toString()).UserId);
        localStorage.setItem('Username',this.getDecodedAccessToken(res.data.toString()).Username);
        // window.location.replace('home')
        this.router.navigate(['/home']);
      },
      error:res => {
        if(res.error.data == '1' || res.error.data == '0' ||  res.error.data=='2' || res.error.data=='3')
        {
          errorAlert(res.error.programMessage,'Xəta');
          return;
        }
        errorAlert('Serverdə hər hansı bir xəta baş verir', 'Xəta');

      }
    });
  }
}
