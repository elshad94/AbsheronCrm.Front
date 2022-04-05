import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payments } from 'src/app/model/payments';
import { PayBorcService } from 'src/app/services/payBorc.service';
import { PayModalComponent } from '../pay-modal/pay-modal.component';
import Swal from 'sweetalert2';
import { PayBorc } from 'src/app/model/payBorc';
import { PaymentService } from 'src/app/services/payment.service';
import { data } from 'jquery';

@Component({
  selector: 'app-pay-kart',
  templateUrl: './pay-kart.component.html',
  styleUrls: ['./pay-kart.component.scss']
})
export class PayKartComponent implements OnInit {

  constructor(private dialogRef:MatDialog,
    @Inject(MAT_DIALOG_DATA) public order: Payments,
    private payment: PaymentService) { }

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
  
      this.payment.payCard(this.order.orderTypeId , this.order.orderId , this.order.amount).subscribe((success: any) =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${this.order.orderNo} sifarişin ödəməsi uğurla qeydə alındı`,
          showConfirmButton: false,
          timer: 2500
        })

        this.payment.isPaymentSuccesfull = true;
        this.dialogRef.closeAll()
  
      },
        (error: any) =>{
        console.log(error.error.error)
        Swal.fire({
          icon: 'info',
          title: 'Məlumat',
          text: `${error.error.error}`
        })
      })
    }

}
