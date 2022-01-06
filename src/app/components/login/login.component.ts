import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import logger from 'src/utils/logger';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    model: any = {};
    constructor(private authService: AuthService,
              private router: Router) {}

    ngOnInit(): void {
        document.getElementById('left_panel')!.style.zIndex = '-1';
        document.getElementById('left_panel')!.style.display = 'none';
        document.getElementById('header_')!.style.zIndex = '-1';
        document.getElementById('header_')!.style.display = 'none';
    }

    getDecodedAccessToken(token?: any): any {
        try{
            return jwt_decode(token?.toString());
        }
        catch(Error){
            return null;
        }
    }

    signin(value:any) {

        console.log(value);
        this.authService.login(value).subscribe(
            (res)=>{
                console.log('Burda');
                console.log(res);
                if(res.status){
                    localStorage.setItem('token',res.data);
                }
                const data = localStorage.getItem('token');
                localStorage.setItem('Userid',this.getDecodedAccessToken(data?.toString()).UserId);
                localStorage.setItem('Username',this.getDecodedAccessToken(data?.toString()).Username);
                this.router.navigate(['home']);
            },

            (err) => {
                console.log(err.error);
                if(err.error.data == '0'){
                    Swal.fire({
                        icon: 'error',
                        title:'Xəta',
                        text: `${err.error.programMessage}`,
                    });
                }
                else if(err.error.data == '1'){
                    Swal.fire({
                        icon: 'error',
                        title:'Xəta',
                        text: `${err.error.programMessage}`,
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title:'Xəta',
                        text: 'Serverdə hər hansı bir xəta baş verir',
                    });
                }
            }
        );
    }

    changePasword(){
        console.log('change');
        this.authService.chagePass().subscribe((res)=>{
            this.router.navigate(['/verify']);
            console.log('changed');
        });
    }
}
