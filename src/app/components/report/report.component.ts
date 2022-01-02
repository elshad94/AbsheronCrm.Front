import { Component, OnInit } from '@angular/core';
import { ReportAll } from 'src/app/model/reportAll';
import { ReportAllService } from 'src/app/services/reportAll.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(private reportAll: ReportAllService) { }

  report: ReportAll[] = [];

  p: number = 1;

  ngOnInit(): void {

    this.reportAll.reportAll().subscribe((data: ReportAll[]) =>{
      this.report = data;
      console.log(data)
    })
  }

}
