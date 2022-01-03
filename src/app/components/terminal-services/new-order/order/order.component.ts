import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TerminalWay } from 'src/app/model/terminal-new-data';
import { TerminalExpense } from 'src/app/model/TerminalExpense';
import { TerminalService } from 'src/app/services/terminal.service';
import logger from 'src/utils/logger';

interface Xidmet {
    expenseId: number,
    expenseText: string,
    temrinalWay: TerminalWay,
    count: number,
    totalAmount: number,
    edv: number
}

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
    expenses!: TerminalExpense[];
    xidmetler!: Xidmet[];
    total!: number;
    totalEdv!: number;
    notes = '';
    fullRefCode = '';
    emptyRefCode = '';
    transportTypeId!: number;

    constructor(
        private terminalService: TerminalService,
        private router: Router) {}

    ngOnInit() {
        const terminalUpdateData = this.terminalService.terminalUpdateData;
        logger.info(this.terminalService.terminalUpdateRequestData);
        if(terminalUpdateData) {
            const terminalWays = terminalUpdateData.terminalWays;
            this.expenses = terminalUpdateData.expenses;
            this.setXidmetlerNew(terminalWays, this.expenses.filter(e => e.isSelected));
            this.transportTypeId = terminalUpdateData.transportTypeId;
            return;
        }
        // TODO: get data for orderId
        logger.warning('USING DUMMY DATA FOR DEVELOPMENT!');
        this.expenses = [{
            id: 1,
            isSelected: false,
            text: 'Bob'
        }, {
            id: 2,
            isSelected: true,
            text: 'Tommy'
        },{
            id: 3,
            isSelected: true,
            text: 'blahblah'
        }];

        const terminalWays = [
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
        this.setXidmetlerNew(terminalWays, this.expenses.filter(e => e.isSelected));
        this.total = 0;
        this.totalEdv = 0;
    }

    private setXidmetlerNew(terminalWays: TerminalWay[], expenses: TerminalExpense[]) {
        const xidmetler_: Xidmet[] = [];
        for(const tw of terminalWays) {
            tw.amount = 5;
            for(const exp of expenses) {
                xidmetler_.push({
                    expenseId: exp.id,
                    expenseText: exp.text,
                    temrinalWay: tw,
                    count: 1,
                    totalAmount: tw.amount,
                    edv: 0
                });
            }
        }
        this.xidmetler = xidmetler_;
    }

    increaseCount(xidmet: Xidmet) {
        xidmet.count++;
        xidmet.totalAmount += xidmet.temrinalWay.amount!;
    }

    decreaseCount(xidmet: Xidmet) {
        xidmet.count--;
        xidmet.totalAmount -= xidmet.temrinalWay.amount!;
    }

    addXidmet() {
        this.xidmetler.push({
            expenseId: this.expenses[0].id,
            expenseText: this.expenses[0].text,
            count: 1,
            temrinalWay: {
                nvNo: '',
                qaimeNo: '',
                yuk: '',
                amount: 0
            },
            totalAmount: 0,
            edv: 0
        });
        this.total = this.xidmetler
            .map(x => x.totalAmount)
            .reduce((prev, next) => next + prev, 0);
        for(const x of this.xidmetler) {
            this.totalEdv += x.edv;
            this.totalEdv += x.totalAmount;
        }
    }

    toReturnFile() {
        if(!this.terminalService.terminalUpdateRequestData) {
            this.terminalService.terminalUpdateRequestData = {
                emptyRefCode: this.emptyRefCode,
                fullRefCode: this.fullRefCode,
                notes: this.notes,
                xidmetler: this.xidmetler.map(x => {return {
                    edv: x.edv,
                    expenseId: x.expenseId,
                    miqdar: x.count,
                    nvNo: x.temrinalWay.nvNo,
                    qaime: x.temrinalWay.qaimeNo,
                    qiymet: x.temrinalWay.amount == null ? 0 : x.temrinalWay.amount
                };}),
                transportTypeId: this.transportTypeId
            };
            this.router.navigate(['/returnFile']);
            return;
        }
        this.terminalService.terminalUpdateRequestData.emptyRefCode = this.emptyRefCode;
        this.terminalService.terminalUpdateRequestData.fullRefCode = this.fullRefCode;
        this.terminalService.terminalUpdateRequestData.notes = this.notes;
        this.terminalService.terminalUpdateRequestData.xidmetler =
        this.xidmetler.map(x => {return {
            edv: x.edv,
            expenseId: x.expenseId,
            miqdar: x.count,
            nvNo: x.temrinalWay.nvNo,
            qaime: x.temrinalWay.qaimeNo,
            qiymet: x.temrinalWay.amount == null ? 0 : x.temrinalWay.amount
        };});
        this.terminalService.terminalUpdateRequestData.transportTypeId = this.transportTypeId;
        this.router.navigate(['/returnFile']);
    }
}
