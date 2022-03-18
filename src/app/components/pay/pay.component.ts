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
import { PayBorcService } from 'src/app/services/payBorc.service';
import { RezidentUser } from 'src/app/model/rezidentUser';
import { AccountService } from 'src/app/services/account.service';
import { PayMethod } from 'src/app/model/payMethod';
import { PassDataService } from 'src/app/services/passData.service';
import { TerminalService } from 'src/app/services/terminal.service';
import TerminalItem from 'src/app/model/terminal-item';

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
    private payBorcService: PayBorcService,
    private accountService: AccountService,
    private readonly passDataService: PassDataService,
    private terminalService: TerminalService,
    private titleService: Title) {

  }

  payments: Payments[] = [];
  voen!: string;
  payStat = false;

  orderTypeText: string[] = [];
  status: any = [];

  columnsToDisplay = ['orderTypeText', 'orderNo', 'amount', 'orderId'];
  dataSource: MatTableDataSource<Payments> = new MatTableDataSource<Payments>(this.payments);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  public openDialog(orderId: number, orderTypeId: number, orderNo: string) {
    this.dialogRef.open(PayModalComponent, {
      data: {
        orderId: orderId,
        orderTypeId: orderTypeId,
        orderNo: orderNo
      },
      height: 'max-content',
      width: '600px',
    });
    this.dialogRef.afterAllClosed.subscribe(res => {
      if (this.payAvService.isPaymentSuccesfull) {
        this.getData(() => this.payAvService.isPaymentSuccesfull = false);
      }
      if (this.payBankService.isPaymentSuccesfull) {
        this.getData(() => this.payBankService.isPaymentSuccesfull = false);
      }
      if (this.payBorcService.isPaymentSuccesfull) {
        this.getData(() => this.payBorcService.isPaymentSuccesfull = false);
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
      if (callback) {
        callback()
      }
      this.accountService.getUser(Number(localStorage.getItem('Userid'))).subscribe((response) => {
        this.voen = response.uVoen;
        this.payService.postVoen(this.voen).subscribe((response) => {
          if (response == 0) {
            this.payStat = true;
            return
          }
          this.passDataService.payMet = response
        });
      });

      this.terminalService.getTerminalOrders().subscribe(terminalItems => {
        terminalItems.map(x => x.orderStatus.statusId)
      })
    });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

