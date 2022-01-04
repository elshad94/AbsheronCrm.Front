import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NvNoTypeId, TerminalWay } from 'src/app/model/terminal-new-data';
import { TerminalExpense } from 'src/app/model/TerminalExpense';
import { TerminalService } from 'src/app/services/terminal.service';
import logger from 'src/utils/logger';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-new-order',
    templateUrl: './new-order.component.html',
    styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {
    nvNoRadio: NvNoTypeId = 1;
    terminalWays: TerminalWay[] = [];
    expenses: TerminalExpense[] = [];
    masterCheck = false;

    constructor(
        private terminalService: TerminalService,
        private router: Router) {
    }

    checkTerminalWayCheckbox(tw: TerminalWay) {
        tw.isSelected = !tw.isSelected;
    }

    checkExpenseCheckbox(ex: TerminalExpense) {
        ex.isSelected = !ex.isSelected;
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

    submit() {
        // check nvNoList not empty
        if(this.terminalWays.filter(tw => tw.isSelected).length === 0) {
            Swal.fire(
                'Error!',
                'En azı bir vaqon və ya konteynr seçin!',
                'error'
            );
            return;
        }
        // check terminalways not empty
        if(this.expenses.filter(exp => exp.isSelected).length === 0) {
            Swal.fire(
                'Error!',
                'En azı bir xidmət seçin!',
                'error'
            );
            return;
        }
        // submit
        this.terminalService.terminalUpdateData = {
            expenses: this.expenses,
            terminalWays: this.terminalWays.filter(tw => tw.isSelected),
            transportTypeId: this.nvNoRadio == 1 ? 23 : 24
        };
        this.router.navigate(['/order']);
    }

    private getNewOrderData() {
        this.terminalService.getNewTerminalData(this.nvNoRadio)
            .subscribe(terminalNewData => {
                this.terminalWays = terminalNewData.terminalWays;
                this.expenses = terminalNewData.expenses;
            });
    }

    checkAllTerminalWays() {
        for(const tw of this.terminalWays) {
            tw.isSelected = !this.masterCheck;
        }
    }
}
