import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ConWag } from 'src/app/model/conWag';
import { OrderCountService } from 'src/app/services/orderCount.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  constructor(private orderCount: OrderCountService) { }

  conWag: ConWag[] = [];

  @ViewChild('chart')
  d1!: ElementRef;

  a: number[] = [];

  ngAfterViewInit() {
    this.orderCount.getOrdersCount().subscribe((data: ConWag[]) => {
      this.conWag = data;
      console.log(data)
    });
    this.d1.nativeElement.insertAdjacentHTML('beforeend', `<canvas id="updatingData" style="height: 20rem;"
    data-hs-chartjs-options='{
      
      "type": "bar",
      "data": {
        "labels": ["Yan", "Fev", "Mar", "Apr", "May", "İyn", "İyl", "Avq", "Sen", "Okt","Noy","Dek"],
        "datasets": [{
          "data": [${this.conWag.map(x => x.konteynrCount)}],
          "backgroundColor": "#57DAC2",
          "hoverBackgroundColor": "#57DAC2",
          "borderColor": "#57DAC2"
        },
        {
          "data": [${this.conWag.map(x => x.vaqonCount)}],
          "backgroundColor": "#377DFF",
          "borderColor": "#377DFF"
        }]
      },
      "options": {
        "scales": {
          "yAxes": [{
            "gridLines": {
              "color": "#e7eaf3",
              "drawBorder": false,
              "zeroLineColor": "#e7eaf3"
            },
            "ticks": {
              "beginAtZero": true,
              "stepSize": 100,
              "fontSize": 12,
              "fontColor": "#000000",
              
              "fontFamily": "Open Sans, sans-serif",
              "padding": 20,
              "postfix": ""
            }
          }],
          "xAxes": [{
            "gridLines": {
              "display": false,
              "drawBorder": false
            },
            "ticks": {
              "fontSize": 12,
              "fontColor": "#97a4af",
              "fontFamily": "Open Sans, sans-serif",
              "padding": 10
            },
            "categoryPercentage": 0.5,
            "maxBarThickness": "12"
          }]
        },
        "cornerRadius": 2,
        "tooltips": {
          "prefix": "",
          "hasIndicator": true,
          "mode": "index",
          "intersect": false
        },
        "hover": {
          "mode": "nearest",
          "intersect": true
        }
      }
    }'></canvas>`);
  }

  ngOnInit() {

  }
}



