import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ConWag } from 'src/app/model/conWag';
import { OrderCountService } from 'src/app/services/orderCount.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private orderCount: OrderCountService) { }

  conWag: ConWag[] = [];

  a: number[] = [];

  // ngAfterViewInit() {
  //   this.orderCount.getOrdersCount().subscribe((data: ConWag[]) => {
  //     this.conWag = data;
  //     console.log(data)
  //   });
  //   this.d1.nativeElement.insertAdjacentHTML('beforeend', `<canvas id="updatingData" style="height: 20rem;"
  //   data-hs-chartjs-options='{
      
  //     "type": "bar",
  //     "data": {
  //       "labels": ["Yan", "Fev", "Mar", "Apr", "May", "İyn", "İyl", "Avq", "Sen", "Okt","Noy","Dek"],
  //       "datasets": [{
  //         "data": [${this.conWag.map(x => x.konteynrCount)}],
  //         "backgroundColor": "#57DAC2",
  //         "hoverBackgroundColor": "#57DAC2",
  //         "borderColor": "#57DAC2"
  //       },
  //       {
  //         "data": [${this.conWag.map(x => x.vaqonCount)}],
  //         "backgroundColor": "#377DFF",
  //         "borderColor": "#377DFF"
  //       }]
  //     },
  //     "options": {
  //       "scales": {
  //         "yAxes": [{
  //           "gridLines": {
  //             "color": "#e7eaf3",
  //             "drawBorder": false,
  //             "zeroLineColor": "#e7eaf3"
  //           },
  //           "ticks": {
  //             "beginAtZero": true,
  //             "stepSize": 100,
  //             "fontSize": 12,
  //             "fontColor": "#000000",
              
  //             "fontFamily": "Open Sans, sans-serif",
  //             "padding": 20,
  //             "postfix": ""
  //           }
  //         }],
  //         "xAxes": [{
  //           "gridLines": {
  //             "display": false,
  //             "drawBorder": false
  //           },
  //           "ticks": {
  //             "fontSize": 12,
  //             "fontColor": "#97a4af",
  //             "fontFamily": "Open Sans, sans-serif",
  //             "padding": 10
  //           },
  //           "categoryPercentage": 0.5,
  //           "maxBarThickness": "12"
  //         }]
  //       },
  //       "cornerRadius": 2,
  //       "tooltips": {
  //         "prefix": "",
  //         "hasIndicator": true,
  //         "mode": "index",
  //         "intersect": false
  //       },
  //       "hover": {
  //         "mode": "nearest",
  //         "intersect": true
  //       }
  //     }
  //   }'></canvas>`);
  // }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
        // x: {},
        // y: {
        //     min: 10
        // }
        yAxes: {
            grid: {
                color: '#e7eaf3',
                drawBorder: false,
                lineWidth: 0
            },
            ticks:{
              color: "#000000",
              padding: 20,
            }
        },
        x: {
            grid: {
                display: false,
                drawBorder: false
            }
        }
    },
    plugins: {
        legend: {
            display: false,
        },
        datalabels: {
            anchor: 'end',
            align: 'end'
        }
    }
};
public barChartType: ChartType = 'bar';
public barChartPlugins = [
    DataLabelsPlugin
];

// public barChartData: ChartData<'bar'> = {
//     labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
//     datasets: [
//         { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Vaqonlar' },
//         { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Konteynerler' }
//     ]
// };

public barChartData!: ChartData<'bar'>;

  ngOnInit() {
    this.orderCount.getOrdersCount().subscribe((conwags: ConWag[]) => {
          // this.barChartData.labels = conwags.map(c => c.orderMonthText);
          // this.barChartData.datasets[0].data = conwags.map(c => c.vaqonCount);
          // this.barChartData.datasets[0].label = 'Vaqonlar';
          // this.barChartData.datasets[1].data = conwags.map(c => c.konteynrCount);
          // this.barChartData.datasets[1].label = 'Konteynrler';
          console.log(conwags);
          this.barChartData = {
              labels: conwags.map(c => c.orderMonthText),
              datasets: [
                  { data: conwags.map(c => c.vaqonCount), label: 'Vaqonlar' },
                  { data: conwags.map(c => c.konteynrCount), label: 'Konteynerler' }
              ]
          };
      });
  }
}



