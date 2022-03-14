import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Balance } from 'src/app/model/balance';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})


export class BalanceComponent implements OnInit {
  operationType: number = 2;

  displayedColumns: string[] = ['date', 'operation', 'amount'];
  dataSource = new MatTableDataSource<Balance>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.getUserBalances()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource<Balance>(
          res.map(dto => {
            return <Balance>{
              amount: dto.amount,
              date: dto.date.substring(0, 10),
              operation: dto.operation,
              operationType: dto.isOut ? 2 : 1
            };
          })
        );
        this.dataSource.paginator = this.paginator;
      });
  }

}
