import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Payments } from 'src/app/model/payments';
import Swal from 'sweetalert2';
import { LastModalComponent } from '../last-modal/last-modal.component';
import { NextModalComponent } from '../next-modal/next-modal.component';


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
      this.dialogRef.open(NextModalComponent, {
        data:{
          orderId: this.data.orderId,
          orderTypeId: this.data.orderTypeId
        },
        height: '400px',
        width: '600px'
      })
      
    }
    if (this.paymentType == 2) {
      this.dialogRef.open(LastModalComponent,{
        height: '100px',
        width: '600px'
      })
    }


  }


  ngOnInit(): void {
  }



}
