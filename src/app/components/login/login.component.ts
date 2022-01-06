import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import logger from 'src/utils/logger';
import LoginRequestData from 'src/app/model/loginRequestData';
import { errorAlert } from 'src/utils/alerts';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
    loginRequestData: LoginRequestData = {
        uEmail: '',
        uPassword: ''
    };

    constructor(private authService: AuthService,
              private router: Router) {}

    ngOnInit(): void {
      document.getElementById('left_panel')!.style.zIndex = '-1';
      document.getElementById('left_panel')!.style.display = 'none';
      document.getElementById('header_')!.style.zIndex = '-1';
      document.getElementById('header_')!.style.display = 'none';
    }

    ngOnDestroy() {
      document.getElementById('left_panel')!.style.zIndex = '0';
      document.getElementById('left_panel')!.style.display = 'block';
      document.getElementById('header_')!.style.zIndex = '0';
      document.getElementById('header_')!.style.display = 'block';
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
        if(this.loginRequestData.uEmail.trim().length === 0) {
            errorAlert('Email-i daxil edin!');
            return;
        }
        if(this.loginRequestData.uPassword.trim().length === 0) {
            errorAlert('Şifrəni daxil edin!');
            return;
        }
        this.authService.login(this.loginRequestData).subscribe({
            next: (res: any) => {
                localStorage.setItem('token', res);
                localStorage.setItem('Userid',this.getDecodedAccessToken(res.toString()).UserId);
                localStorage.setItem('Username',this.getDecodedAccessToken(res.toString()).Username);
                this.router.navigate(['home']);
            },
            error: res => {
                logger.info(res.error);
                if(res.status === 400){
                    errorAlert(res.error, 'Xəta');
                    return;
                }
                errorAlert('Serverdə hər hansı bir xəta baş verir', 'Xəta');
            }
        });
    }

    changePasword(){
        console.log('change');
        this.authService.chagePass().subscribe((res)=>{
            this.router.navigate(['/verify']);
            console.log('changed');
        });
    }
}
