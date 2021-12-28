import { Component, OnInit } from '@angular/core';
import { NvNoTypeId } from 'src/app/model/terminal-new-data';
import { TerminalService } from 'src/app/services/terminal.service';

@Component({
    selector: 'app-new-order',
    templateUrl: './new-order.component.html',
    styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
    terminalService!: TerminalService;
    nvNoRadio: NvNoTypeId = 1;
    
    constructor(service: TerminalService) {
        this.terminalService = service;
    }

    ngOnInit() {
        document.addEventListener('DOMContentLoaded', (event) => { 
            const vaqonRadio = document.getElementById('nvNoRadio_vaqon') as HTMLInputElement;
            vaqonRadio.checked = true;
        });
    }

    changeVaqonType() {
        this.getNewOrderData();
    }

    private getNewOrderData() {
        this.terminalService.getNewTerminalData(this.nvNoRadio)
            .subscribe(terminalNewData => {
                console.log(terminalNewData);
            });
    }
}
