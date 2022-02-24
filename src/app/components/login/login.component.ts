import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import jwt_decode from 'jwt-decode';
import LoginRequestData from 'src/app/model/loginRequestData';
import { errorAlert, infoAlert } from 'src/utils/alerts';
import { GlobalService } from 'src/app/services/global.service';
import { Title } from "@angular/platform-browser";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginRequestData: LoginRequestData = {
    uEmail: '',
    uPassword: '',
    phone: '',
    userId: '',
    transactionId: '',
    certificate: '',
    challenge: '',
    verificationCode: ''
  };

  tab: any = 'tab1';
  tab1: any
  tab2: any

  constructor(private authService: AuthService,
    private router: Router,
    private globalService: GlobalService,
    private titleService: Title) {
    this.titleService.setTitle("Daxil Ol  | Abşeron Logistika Mərkəzi")
  }

  public submitted = false;
  public showPassword?: boolean;
  public loginType: boolean = true;

  ngOnInit(): void {
    this.titleService.setTitle("Login | Abşeron Logistika Mərkəzi");
  }

  getDecodedAccessToken(token?: any): any {
    try {
      return jwt_decode(token?.toString());
    }
    catch (Error) {
      return null;
    }
  }

  signin() {
    this.authService.login(this.loginRequestData).subscribe({
      next: (res: any) => {
        this.globalService.token = res.data;
        localStorage.setItem('Userid', this.getDecodedAccessToken(res.data.toString()).UserId);
        localStorage.setItem('Username', this.getDecodedAccessToken(res.data.toString()).Username);
        this.router.navigate(['/home']);
      },
      error: res => {
        if (res.error.data == '1' || res.error.data == '0' || res.error.data == '2' || res.error.data == '3' || res.error.data == '4') {
          infoAlert(res.error.programMessage, 'Məlumat');
          return;
        }
        errorAlert('Serverdə hər hansı bir xəta baş verir', 'Xəta');

      }
    });
  }



  tabChange(check: number) {
    if (check == 1) {
      this.tab = 'tab1';
      this.loginType = true;
    } else if (check == 2) {
      this.loginType = false;
      this.tab = 'tab2';
    }
    console.log(this.loginType)
  }
}

