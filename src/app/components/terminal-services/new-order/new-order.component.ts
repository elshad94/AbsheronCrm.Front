import { Component, OnInit } from '@angular/core';
import { NvNoTypeId, TerminalNewOrderExpense, TerminalWay } from 'src/app/model/terminal-new-data';
import { TerminalService } from 'src/app/services/terminal.service';

@Component({
    selector: 'app-new-order',
    templateUrl: './new-order.component.html',
    styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
    terminalService!: TerminalService;
    nvNoRadio: NvNoTypeId = 1;
    terminalWays: TerminalWay[] = [];
    nvnoList: string[] = [];
    expenses: TerminalNewOrderExpense[] = [];
    
    constructor(service: TerminalService) {
        this.terminalService = service;
    }

    ngOnInit() {
        document.addEventListener('DOMContentLoaded', () => { 
            const vaqonRadio = document.getElementById('nvNoRadio_vaqon') as HTMLInputElement;
            vaqonRadio.checked = true;
        });
        this.getNewOrderData();
    }

    changeVaqonType() {
        this.getNewOrderData();
    }

    checkTerminalWay(event: Event, nvNo: string) {
        const checkbox = event.target as HTMLInputElement;
        if(checkbox.checked) {
            this.nvnoList.push(nvNo);
            return;
        }
        this.nvnoList = this.nvnoList.filter(nvno => nvno !== nvNo);
    }

    private getNewOrderData() {
        this.terminalService.getNewTerminalData(this.nvNoRadio)
            .subscribe(terminalNewData => {
                this.terminalWays = terminalNewData.terminalWays;
                this.expenses = terminalNewData.expenses;
                this.nvnoList = [];
            });
    }
}
