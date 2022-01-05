import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportAll } from 'src/app/model/reportAll';
import { ReportAllService } from 'src/app/services/reportAll.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private reportAll: ReportAllService) {

  }

  report: ReportAll[] = [];
  columnsToDisplay = ['orderNo', 'orderTypeId', 'orderDate', 'orderAmount', 'transPortNumber', 'isPaymentPaid'];
  dataSource: MatTableDataSource<ReportAll> = new MatTableDataSource<ReportAll>(this.report);
  pipe!: DatePipe;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchText: string = '';

  ngOnInit(): void {

    this.reportAll.reportAll().subscribe((data: ReportAll[]) => {
      this.dataSource = new MatTableDataSource<ReportAll>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  get start(): any { return this.dateRange.get('start')?.value; }
  get end(): any { return this.dateRange.get('end')?.value; }


  forDate() {
    this.dataSource.filterPredicate = (data: ReportAll, filter: string) => {
      if (this.start && this.end) {
        return data.orderDate >= this.start && data.orderDate <= this.end;
      }
      return true;
    }
  }

  applyFilter() {
    this.pipe = new DatePipe('en');
    
    this.dataSource.filterPredicate = (data, filter) =>{
      if (this.start && this.end) {
        return data.orderDate >= this.start && data.orderDate <= this.end;
      }
      return true;
    }
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.start , this.end)
  };



}
