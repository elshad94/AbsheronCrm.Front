import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';
import { TITLE } from 'src/utils/contants';
import { Title } from '@angular/platform-browser';
import logger from 'src/utils/logger';
import { successAlert } from 'src/utils/alerts';

@Component({
    selector: 'app-changepwd',
    templateUrl: './changepwd.component.html',
    styleUrls: ['./changepwd.component.scss'],
})
export class ChangepwdComponent implements OnInit {
    public model!: any;
    public nwPsw="";
    public confrmPsw="";
    public submitted: boolean=false;
    public checkPsw:boolean=false;



    ngOnInit(): void {
        this.titleService.setTitle(`Şifrəni Dəyiş${TITLE}`);
    }

    constructor(private accountService: AccountService,
      private titleService: Title
      ) {}

    UpdatePass(pass: any) {
        this.submitted = true;
        if(!pass.valid) {
            return;
        }
        if(!(pass.value.newPassword==pass.value.confirmPassword)){
            this.checkPsw = true;
            return;
           }
        this.changingPassword(pass.value)
    }


    changingPassword(value:any){
        this.model = value;
        this.model.UserId = localStorage.getItem('Userid');

        Swal.fire({
            title: 'Şifrəniz dəyişilsin?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Bəli',
            cancelButtonText: 'Xeyr',
        }).then((result) => {
            if (result.isConfirmed) {
                this.accountService.updatePassword(this.model).subscribe((res) => {

                    Swal.fire(
                        'Yadda saxlanıldı!',
                        'Şifrəniz dəyişdirildi',
                        'success'
                    );
                },(err) =>{
                    Swal.fire({
                        icon: 'error',
                        title:'Xəta',
                        text: 'Şifrəniz doğru deyil',
                    });
                });
            }
        });
    }
    openDialog(orderId: number, orderNo: string) {}
}
