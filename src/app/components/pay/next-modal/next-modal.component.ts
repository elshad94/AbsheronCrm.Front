import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PayAvans } from 'src/app/model/payAvans';
import { Payments } from 'src/app/model/payments';
import { PayAvansService } from 'src/app/services/payAvans.service';
import Swal from 'sweetalert2';
import { PayModalComponent } from '../pay-modal/pay-modal.component';


@Component({
  selector: 'app-next-modal',
  templateUrl: './next-modal.component.html',
  styleUrls: ['./next-modal.component.scss']
})
export class NextModalComponent implements OnInit {

  constructor(private dialogRef:MatDialog,
    @Inject(MAT_DIALOG_DATA) public order: Payments,
    private payAv: PayAvansService,
    private router: Router,) { }

  public openDialog(orderId: number, orderTypeId: number,  orderNo: string) {
    console.log(orderNo)
    this.dialogRef.closeAll()
    this.dialogRef.open(PayModalComponent,{
      data:{
        orderId: orderId,
        orderTypeId: orderTypeId,
        orderNo: orderNo
      },
      height: '150px',
      width: '600px',
    })
  }

  ngOnInit(): void {

  }

  paymentAv(){
  const newPayAv: PayAvans = {
    orderId: this.order.orderId,
    orderType: this.order.orderTypeId
  };

    this.payAv.payAvansMet(newPayAv).subscribe(success =>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${this.order.orderNo} sifarişin ödəməsi uğurla qeydə alındı`,
        showConfirmButton: false,
        timer: 2500
      })
      this.payAv.isPaymentSuccesfull = true;
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
