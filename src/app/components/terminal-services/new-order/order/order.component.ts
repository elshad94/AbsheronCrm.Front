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
            logger.info(this.terminalWays);
            logger.info(this.expenses);
            logger.info('GREAT SUCCESS');
            return;
        }
        logger.error('NOT IMPLEMENTED!');
    }

}
