import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Payments } from 'src/app/model/payments';
import { PayAvansService } from 'src/app/services/payAvans.service';
import { PaymentService } from 'src/app/services/payment.service';
import logger from 'src/utils/logger';
import { PayModalComponent } from './pay-modal/pay-modal.component';
import { PayBankService } from 'src/app/services/payBank.service';
import { TITLE } from 'src/utils/contants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(private dialogRef: MatDialog,
    private payService: PaymentService,
    private payAvService: PayAvansService,
    private payBankService: PayBankService,
    private titleService: Title) {

  }

  payments: Payments[] = [];

  orderTypeText: string[] = [];

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
      height: 'max-content',
      width: '600px',
    });
    this.dialogRef.afterAllClosed.subscribe(res => {
      if(this.payAvService.isPaymentSuccesfull) {
        this.getData(() => this.payAvService.isPaymentSuccesfull = false);
      }
      if(this.payBankService.isPaymentSuccesfull) {
        this.getData(() => this.payBankService.isPaymentSuccesfull = false);
      }
    });
  }

  ngOnInit(): void {
    this.getData();
    this.titleService.setTitle(`Ödəmə${TITLE}`);
  }

  private getData(callback: any = null) {
    this.payService.payAll().subscribe((data: Payments[]) => {
      this.dataSource = new MatTableDataSource<Payments>(data);
      this.dataSource.paginator = this.paginator;
      this.orderTypeText = [...new Set(data.map(d => d.orderTypeText))];
      if(callback) {
        callback()
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // filterTableByStatus(event: Event) {
  //   const elem = event.target as HTMLInputElement;
  //   const status = elem.value;
  //   this.dataSource.filterPredicate = (data: Payments, filter: string) =>
  //     data.orderTypeText.trim().toLowerCase() === filter;
  //   this.dataSource.filter = status.trim().toLowerCase();
  // }

}

