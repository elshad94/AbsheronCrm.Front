import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import TerminalItem from 'src/app/model/terminal-item';
import { TerminalService } from 'src/app/services/terminal.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
    columnsToDisplay = ['orderNo', 'date', 'amount', 'statusText', 'edit', 'delete'];
    terminalItems: TerminalItem[] = [];
    dataSource: MatTableDataSource<TerminalItem> = new MatTableDataSource<TerminalItem>(this.terminalItems);
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private terminalService: TerminalService,
        public dialog: MatDialog
    ) { }

    ngOnInit() {
        this.getTerminalorders();
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
            .subscribe(response => {
                switch(response.status) {
                case 404:
                    Swal.fire(
                        'Error!',
                        `Order No ${orderNo} artıq silinib!`,
                        'error'
                    );
                    break;
                case 400: case 500:
                    Swal.fire(
                        'Error!',
                        'Server problemi',
                        'error'
                    );
                    break;
                default:
                    Swal.fire(
                        'Silindi!',
                        `Sifariş No ${orderNo} silindi`,
                        'success'
                    );
                    this.getTerminalorders();
                }
            });
    }

    private getTerminalorders() {
        this.terminalService
            .getTerminalOrders()
            .subscribe(terminalItems => {
                this.dataSource = new MatTableDataSource<TerminalItem>(terminalItems);
                this.dataSource.paginator = this.paginator;
            });
    }
}
