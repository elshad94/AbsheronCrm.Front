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
export class LoginComponent {
    loginRequestData: LoginRequestData = {
        uEmail: '',
        uPassword: ''
    };

    constructor(private authService: AuthService,
              private router: Router) {}

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
                logger.info(res);
                localStorage.setItem('token', res.data);
                localStorage.setItem('Userid',this.getDecodedAccessToken(res.data.toString()).UserId);
                localStorage.setItem('Username',this.getDecodedAccessToken(res.data.toString()).Username);
                this.router.navigate(['home']);
            },
            error: res => {
                logger.info(res.error);
                if(res.error.data == '1' || res.error.data == '0'){
                    errorAlert(res.error.programMessage,'Xəta');
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
