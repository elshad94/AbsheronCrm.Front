import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Balance } from 'src/app/model/balance';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})


export class BalanceComponent implements OnInit {

  ELEMENT_DATA: Balance[] = [
    {date: '23-02-2022', operation: 'Broker balans məxaric',   amount: 14},
    {date: '19-02-2022', operation: 'Broker balans mədaxil',   amount: 124},
    {date: '13-02-2022', operation: 'Terminal balans məxaric', amount: 32},
    {date: '24-01-2022', operation: 'Broker balans mədaxil',   amount: 98},
  ];

  operationType: number = 2;

  displayedColumns: string[] = ['date', 'operation', 'amount'];
  dataSource = this.ELEMENT_DATA;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit() {

  }

}
