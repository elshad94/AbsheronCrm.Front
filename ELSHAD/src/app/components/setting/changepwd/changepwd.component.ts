import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-changepwd',
    templateUrl: './changepwd.component.html',
    styleUrls: ['./changepwd.component.scss'],
})
export class ChangepwdComponent {
    public model!: any;
    public nwPsw="";
    public confrmPsw="";
    public submitted: boolean=false;

    constructor(private accountService: AccountService) {}

    UpdatePass(pass: any) {
        this.submitted = true;

        if(!pass.valid) {
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
                    console.log(res);

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
