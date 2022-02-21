import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PayBorc } from 'src/app/model/payBorc';
import { Payments } from 'src/app/model/payments';
import { PayBorcService } from 'src/app/services/payBorc.service';
import Swal from 'sweetalert2';
import { PayModalComponent } from '../pay-modal/pay-modal.component';

@Component({
  selector: 'app-pay-borc',
  templateUrl: './pay-borc.component.html',
  styleUrls: ['./pay-borc.component.scss']
})
export class PayBorcComponent implements OnInit {

  constructor(private dialogRef:MatDialog,
    @Inject(MAT_DIALOG_DATA) public order: Payments,
    private payBorc: PayBorcService) { }

  ngOnInit() {
  }

  public openDialog(orderId: number, orderTypeId: number,  orderNo: string) {
    this.dialogRef.closeAll()
    this.dialogRef.open(PayModalComponent,{
      data:{
        orderId: orderId,
        orderTypeId: orderTypeId,
        orderNo: orderNo
      },
      height: 'max-content',
      width: '600px',
    })
  }

  paymentAv(){
    const newPayBorc: PayBorc = {
      orderId: this.order.orderId,
      orderType: this.order.orderTypeId
    };
  
      this.payBorc.payBorcMet(newPayBorc).subscribe(success =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${this.order.orderNo} sifarişin ödəməsi uğurla qeydə alındı`,
          showConfirmButton: false,
          timer: 2500
        })
        this.payBorc.isPaymentSuccesfull = true;
        this.dialogRef.closeAll()
  
      },
      error =>{
        Swal.fire({
          icon: 'error',
          title: 'Uğursuz əməliyyat...',
          text: 'Server xətası'
        })
      })
    }

}
