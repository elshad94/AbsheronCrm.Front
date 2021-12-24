import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import TerminalItem from 'src/app/model/terminal-item';
import { TerminalService } from 'src/app/services/terminal.service';
import { DeleteDialogComponent } from '../../delete-dialog/delete-dialog.component';

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
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
            width: '250px',
            data: {orderNo, orderId},
        });

        dialogRef.afterClosed().subscribe(orderId => {
            if(!orderId) {
                return;
            }
            this.deleteTerminalOrder(orderId);
        });
    }

    private deleteTerminalOrder(orderId: number) {
        this.terminalService
            .deleteTerminalOrder(orderId)
            .subscribe(response => {
                switch(response.status) {
                case 404:
                    //TODO: popup
                    console.log('NOT FOUND');
                    break;
                case 400: case 500:
                    //TODO: popup
                    console.log('ERROR');
                    break;
                default:
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
