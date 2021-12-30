import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ConWag } from 'src/app/model/conWag';
import { OrderCountService } from 'src/app/services/orderCount.service';
import { ChartConfiguration, ChartData, ChartType, ChartDatasetProperties } from 'chart.js';
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
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: false,
                    lineWidth: 0,
                },
                ticks: {
                    color: "#000000",
                    padding: 20,
                    maxTicksLimit: 7,
                }
            },
            x: {
                grid: {
                    display: false,
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
            },
            tooltip:{
                mode: "index",
                intersect: false
            }
        }
    };
    public barChartType: ChartType = 'bar';
    public barChartPlugins = [
        DataLabelsPlugin
    ];

    public barChartData!: ChartData<'bar'>;

    public barCharDatasetProperties!: ChartDatasetProperties<'bar', number[]>

    ngOnInit() {
        this.orderCount.getOrdersCount().subscribe((conwags: ConWag[]) => {

            this.conWag = conwags;

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



