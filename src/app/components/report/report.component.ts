import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ReportAll } from 'src/app/model/reportAll';
import { ReportAllService } from 'src/app/services/reportAll.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private reportAll: ReportAllService) { }

  ngOnInit(): void {
    
    this.reportAll.reportAll().subscribe((data: ReportAll[]) =>{
      this.report = data;
    })
  }

  report: ReportAll[] = [];

  public reportSlice = this.report.slice(0, 5);

  
  OnPageChange(event: PageEvent){
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.report.length) {
      endIndex = this.report.length;
    }
    this.reportSlice = this.report.slice(startIndex, endIndex)
    this.ngOnInit()
  }

}
