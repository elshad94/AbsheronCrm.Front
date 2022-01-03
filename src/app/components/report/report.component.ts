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

  searchText = '';

  ngOnInit(): void {

    this.reportAll.reportAll().subscribe((data: ReportAll[]) => {
      this.dataSource = new MatTableDataSource<ReportAll>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // IKI DATE i de bura pass ele obje kimi (example {date1: ...., date2: ....})
    // this.dataSource.filterPredicate = (data: ReportAll, filter: string) =>
    //   data.orderDate === Date(filter); // BURDA FILTER ELE, this.dataSource.filter, filter paramina pass olunur
  }

}
