import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import jwt_decode from 'jwt-decode';
import LoginRequestData from 'src/app/model/loginRequestData';
import { errorAlert, infoAlert } from 'src/utils/alerts';
import { GlobalService } from 'src/app/services/global.service';
import { Title } from "@angular/platform-browser";
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import AsanLoginRequestData from 'src/app/model/asanLoginRequsetData';
import AsanLoginResponceData from 'src/app/model/asanLoginResponceData';
import { PassDataService } from 'src/app/services/passData.service';


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

  asanRequestData: AsanLoginRequestData = {
    phone: '',
    userId: ''
  };

  tab: any = 'tab1';
  tab1: any
  tab2: any

  constructor(private authService: AuthService,
    private router: Router,
    private globalService: GlobalService,
    private titleService: Title,
    private readonly passDataService: PassDataService) {
  }

  public submitted = false;
  public showPassword?: boolean;
  public loginType: boolean = true;
  transacId?: string;
  verifyCode?: string;
  intervalReg?: number = 5000;

  statCheck: any = []
  status?: any = {
    status: ''
  };
  

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

  testsubscription!: Subscription;

  asanLog() {

    const setInterval = interval(this.intervalReg)
    console.log(this.asanRequestData)
    this.authService.aslogin(this.asanRequestData).subscribe({
      next: (result: AsanLoginResponceData) => {
        this.statCheck = result

        this.transacId = result.transactionId
        this.verifyCode = result.verificationCode

        if (this.transacId == '0') {
          Swal.fire({
            icon: 'error',
            title: 'Xəta',
            text: 'Serverdə xəta baş verdi!',
            confirmButtonText: 'Bağla'
          })
          this.testsubscription.unsubscribe()
          return;
        }
        Swal.fire({
          imageUrl: '../../../assets/img/loading.gif',
          showCloseButton: true,
          showConfirmButton: false,
          width: '370px',
          imageWidth: '40%',
          title: 'Xahiş edirik telefonunuzu yoxlayın.',
          html: `Yoxlama kodu: ${this.verifyCode}`,
          allowOutsideClick: false
        })
      },
      error: (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Xəta',
          text: 'Serverdə xəta baş verdi!',
        })
      }
    })

    this.testsubscription = setInterval.subscribe((res: any) => {
      console.log(this.statCheck)
      this.authService.asloginStat(this.statCheck).subscribe({
        next: (result: string) => {
          this.status = result
          console.log(this.status.status)
          if (this.status.status == 'USER_AUTHENTICATED') {

            this.passDataService.data = this.asanRequestData;

            console.log(this.passDataService.data)
            
            this.testsubscription.unsubscribe()
            Swal.close();
            this.router.navigate(['/certificate']);
          }
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Xəta',
            text: 'Serverdə xəta baş verdi!',
          })
        }
      })


    })


  }

  tabChange(check: number) {
    if (check == 1) {
      this.tab = 'tab1';
      this.loginType = true;
    } else if (check == 2) {
      this.loginType = false;
      this.tab = 'tab2';
    }
  }


}

