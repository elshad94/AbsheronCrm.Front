import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ConWag } from 'src/app/model/conWag';
import { OrderCountService } from 'src/app/services/orderCount.service';
import { ChartConfiguration, ChartData, ChartType, ChartDatasetProperties } from 'chart.js';
import * as $ from 'jquery';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Title } from '@angular/platform-browser';
import { TITLE } from 'src/utils/contants';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private orderCount: OrderCountService,
                private spinnerService: SpinnerService,
                private titleService: Title) { }

    conWag: ConWag[] = [];

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
                    color: '#000000',
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
                mode: 'index',
                intersect: false
            }
        }
    };
    public barChartType: ChartType = 'bar';
    public barChartPlugins = [
        DataLabelsPlugin
    ];

    public barChartData!: ChartData<'bar'>;

    public barCharDatasetProperties!: ChartDatasetProperties<'bar', number[]>;

    ngOnInit() {
      this.titleService.setTitle(`Ana Səhifə${TITLE}`);
        this.orderCount.getOrdersCount().subscribe((conwags: ConWag[]) => {

            this.conWag = conwags;

            this.barChartData = {
                labels: conwags.map(c => c.orderMonthText),
                datasets: [
                    { data: conwags.map(c => c.vaqonCount), label: 'Vaqonlar', backgroundColor: '#57dac2' , hoverBackgroundColor: '#57dac2' , barThickness: 15, borderRadius: 5, borderColor: '#57dac2'},
                    { data: conwags.map(c => c.konteynrCount), label: 'Konteynerler', backgroundColor: '#377dff', hoverBackgroundColor: '#377dff', barThickness: 15, borderRadius: 5, borderColor: '#377dff' }
                ]
            };
        });

        if (window.innerWidth < 768) {
            $("canvas").attr("height","250");
        }
    }
}



