import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import TerminalItem from 'src/app/model/terminal-item';
import { TerminalService } from 'src/app/services/terminal.service';
import { errorAlert, successAlert } from 'src/utils/alerts';
import logger from 'src/utils/logger';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import { TITLE } from 'src/utils/contants';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  columnsToDisplay = ['orderNo', 'date', 'amount', 'statusText', 'paymentMethod',
    'paymentStatus', 'actions'];
  terminalItems: TerminalItem[] = [];
  dataSource: MatTableDataSource<TerminalItem> = new MatTableDataSource<TerminalItem>(this.terminalItems);
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    orderStatuses: string[] = [];

    constructor(
        private terminalService: TerminalService,
        public dialog: MatDialog,
        private titleService: Title
    ) { }

    ngOnInit() {
      this.getTerminalorders();
      this.titleService.setTitle(`Terminal${TITLE}`);
    }

    openDialog(orderId: number, orderNo: string) {
      Swal.fire({
        title: `Sifariş No ${orderNo} silinsin?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Bəli',
        cancelButtonText: 'Xeyr'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTerminalOrder(orderId, orderNo);
        }
      });
    }

    private deleteTerminalOrder(orderId: number, orderNo: string) {
      this.terminalService
        .deleteTerminalOrder(orderId)
        .subscribe({
          next: () => {
            this.getTerminalorders(() => successAlert(`Sifariş No ${orderNo} silindi`, 'Silindi!'));
          },
          error: error => {
            if(error.status === 404) {
              errorAlert(`Order No ${orderNo} artıq silinib!`);
              return;
            }
            errorAlert('Server problemi');
          }
        });
    }

    private getTerminalorders(callback?: () => void) {
      this.terminalService
        .getTerminalOrders()
        .subscribe(terminalItems => {
          this.dataSource = new MatTableDataSource<TerminalItem>(terminalItems);
          this.dataSource.paginator = this.paginator;
          this.orderStatuses = [...new Set(terminalItems.map(ti => ti.orderStatus.statusText))];
          console.log(this.orderStatuses)
          if(callback) {
            callback();
          }
        });
    }

    filterTableByStatus(event: Event) {
      const status = (event.target as HTMLInputElement).value;
      this.dataSource.filterPredicate = (data: TerminalItem, filter: string) =>
        data.orderStatus.statusText === filter;
      this.dataSource.filter = status.trim();
    }
}
