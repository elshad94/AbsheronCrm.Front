import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NvNoTypeId, TerminalWay } from 'src/app/model/terminal-new-data';
import { TerminalExpense } from 'src/app/model/TerminalExpense';
import { TerminalService } from 'src/app/services/terminal.service';
import { TITLE } from 'src/utils/contants';
import { Title } from '@angular/platform-browser';
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
        private router: Router,
        private titleService: Title) {
  }

  checkExpenseCheckbox(ex: TerminalExpense) {
    if(ex.isReadOnly) return;
    ex.isSelected = !ex.isSelected;
  }

  public isCheck?:boolean=true;
  ngOnInit() {
    this.getNewOrderData();
    this.titleService.setTitle(`Terminal${TITLE}`);
  }

  changeVaqonType(vaqonType: number) {
    this.nvNoRadio = vaqonType as NvNoTypeId;
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
        for(const exp of this.expenses) {
          exp.checkCounter = 0;
        }
        this.terminalService.customer = terminalNewData.customer;
        this.terminalService.orderDate = terminalNewData.orderDate;
      });
  }

  checkAllTerminalWays() {
    this.expenses.forEach(e => e.checkCounter = 0);
    if(this.masterCheck) {
      for(const tw of this.terminalWays) {
        this.expenses.forEach(e => {
          if(tw.expenseIds?.includes(e.id)) e.checkCounter!++;
        });
      }
    }
    for(const tw of this.terminalWays) {
      tw.isSelected = !this.masterCheck;
      this.selectTerminalWay(tw);
    }
  }

  checkTerminalWayCheckbox(tw: TerminalWay) {
    tw.isSelected = !tw.isSelected;
    this.selectTerminalWay(tw);
  }

  selectTerminalWay(tw: TerminalWay) {
    this.expenses.forEach(e => {
      if(tw.expenseIds?.includes(e.id)) {
        if(tw.isSelected) {
          e.checkCounter!++;
        } else {
          e.checkCounter!--;
        }
        e.isReadOnly = e.checkCounter! > 0;
        e.isSelected = e.checkCounter! > 0;
      }
    });
  }
}
