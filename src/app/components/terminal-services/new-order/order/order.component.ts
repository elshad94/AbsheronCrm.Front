import { Component, OnInit } from '@angular/core';
import { TerminalWay } from 'src/app/model/terminal-new-data';
import { TerminalExpense } from 'src/app/model/TerminalExpense';
import { TerminalService } from 'src/app/services/terminal.service';
import logger from 'src/utils/logger';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    terminalWays!: TerminalWay[];
    expenses!: TerminalExpense[];

    constructor(private terminalService: TerminalService) {}

    ngOnInit() {
        const terminalUpdateData = this.terminalService.terminalUpdateData;
        if(terminalUpdateData) {
            this.terminalWays = terminalUpdateData.terminalWays;
            this.expenses = terminalUpdateData.expenses; 
            return;
        }
        logger.warning('USING DUMMY DATA FOR DEVELOPMENT!');
        this.expenses = [{
            id: 1,
            isSelected: true,
            text: 'Bob'
        }, {
            id: 2,
            isSelected: true,
            text: 'Tommy'
        },{
            id: 2,
            isSelected: true,
            text: 'blahblah'
        }];
        this.terminalWays = [
            { 
                nvNo: '53551842',
                qaimeNo: '31874135',
                yuk: '73063072 Трубы,трубки сварные,круглого сечения,из железа или нелегированной стали,наружным диаметром не более 168.3мм,оцинкованные'
            },
            { 
                nvNo: '53553842',
                qaimeNo: '32874135',
                yuk: '73063232 Трубы,трубки сварные,круглого сечения,из железа или нелегированной стали,наружным диаметром не более 168.3мм,оцинкованные'
            },
            { 
                nvNo: '53553342',
                qaimeNo: '32324135',
                yuk: '73063234 Трубы,трубки сварные,круглого сечения,из железа или нелегированной стали,наружным диаметром не более 168.3мм,оцинкованные'
            }
        ];
    }

    setExpenseSelected(exp: TerminalExpense) {
        exp.isSelected = true;
    }

}
