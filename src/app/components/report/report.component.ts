import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReportAll } from 'src/app/model/reportAll';
import { ReportAllService } from 'src/app/services/reportAll.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private reportAll: ReportAllService) { }

  columnsToDisplay = ['orderNo', 'orderTypeId', 'orderDate', 'orderAmount', 'transPortNumber', 'isPaymentPaid'];
  report: ReportAll[] = [];
  dataSource: MatTableDataSource<ReportAll> = new MatTableDataSource<ReportAll>(this.report);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    
    this.reportAll.reportAll().subscribe((data: ReportAll[]) =>{
      this.dataSource = new MatTableDataSource<ReportAll>(data);
      this.dataSource.paginator = this.paginator;
    })
  }

}
