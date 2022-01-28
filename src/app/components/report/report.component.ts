import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportAll } from 'src/app/model/reportAll';
import { ReportAllService } from 'src/app/services/reportAll.service';
import { FormControl, FormGroup } from '@angular/forms';
import { TITLE } from 'src/utils/contants';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private reportAll: ReportAllService,
    private titleService: Title,
    public datepipe: DatePipe) {

  }

  report: ReportAll[] = [];
  columnsToDisplay = ['orderNo', 'orderTypeId', 'orderDate', 'orderAmount', 'transPortNumber', 'isPaymentPaid'];
  dataSource: MatTableDataSource<ReportAll> = new MatTableDataSource<ReportAll>(this.report);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  pipe = new DatePipe('en-US');

  startDate: string = '';
  endDate: string = '';

  ngOnInit(): void {
    this.titleService.setTitle(`Hesabat${TITLE}`);
    this.reportAll.reportAll().subscribe((data: ReportAll[]) => {
      this.dataSource = new MatTableDataSource<ReportAll>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  applyFilter() {
    const startDate = this.pipe.transform(this.startDate, 'yyyy-MM-dd');
    const endDate = this.pipe.transform(this.endDate, 'yyyy-MM-dd');


    this.reportAll.getDate(startDate!, endDate!).subscribe((data: ReportAll[]) => {
      this.dataSource = new MatTableDataSource<ReportAll>(data);
      this.dataSource.paginator = this.paginator;
    });

  };



}
