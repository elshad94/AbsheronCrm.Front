import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Payments } from 'src/app/model/payments';
import { PaymentService } from 'src/app/services/payment.service';
import { PayModalComponent } from './pay-modal/pay-modal.component';



@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(private dialogRef: MatDialog,
    private payService: PaymentService) { 
      
    }

  payments: Payments[] = [];
  columnsToDisplay = ['orderTypeText', 'orderNo', 'amount', 'orderId'];
  dataSource: MatTableDataSource<Payments> = new MatTableDataSource<Payments>(this.payments);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  public openDialog(orderId: number, orderTypeId: number, orderNo: string) {
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
    this.payService.payAll().subscribe((data: Payments[]) => {
      this.dataSource = new MatTableDataSource<Payments>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}

