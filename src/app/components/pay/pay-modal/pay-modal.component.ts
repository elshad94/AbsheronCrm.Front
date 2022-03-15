import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Payments } from 'src/app/model/payments';
import Swal from 'sweetalert2';
import { LastModalComponent } from '../last-modal/last-modal.component';
import { NextModalComponent } from '../next-modal/next-modal.component';
import { PayBorcComponent } from '../pay-borc/pay-borc.component';


@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.component.html',
  styleUrls: ['./pay-modal.component.scss']
})
export class PayModalComponent implements OnInit {

  payments: Payments[] = [];
  columnsToDisplay = ['orderTypeText', 'orderNo', 'amount', 'orderId'];
  dataSource: MatTableDataSource<Payments> = new MatTableDataSource<Payments>(this.payments);

  constructor(private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Payments) {
  }

  paymentType:number = -1;
  openDialogNext() {
    if (this.paymentType == -1) {
      Swal.fire({
        icon: 'error',
        title: 'Uğursuz əməliyyat...',
        text: 'Zəhmət olmasa ödəmə üsulu seçin!'
      })
    }
    if (this.paymentType == 1) {
      this.dialogRef.closeAll()
      this.dialogRef.open(NextModalComponent, {
        data:{
          orderId: this.data.orderId,
          orderTypeId: this.data.orderTypeId,
          orderNo: this.data.orderNo
        },
        height: 'max-content',
        width: '435px'
      })

    }
    if (this.paymentType == 2) {
      this.dialogRef.closeAll()
      this.dialogRef.open(LastModalComponent,{
        data:{
          orderId: this.data.orderId,
          orderTypeId: this.data.orderTypeId,
          orderNo: this.data.orderNo
        },
        height: 'max-content',
        width: '520px'
      })
    }
    if (this.paymentType == 4) {
      this.dialogRef.closeAll()
      this.dialogRef.open(PayBorcComponent,{
        data:{
          orderId: this.data.orderId,
          orderTypeId: this.data.orderTypeId,
          orderNo: this.data.orderNo
        },
        height: 'max-content',
        width: '520px'
      })
    }
    if (this.paymentType == 3) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Tezliklə istifadəyə veriləcək',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }


  ngOnInit(): void {
  }



}
