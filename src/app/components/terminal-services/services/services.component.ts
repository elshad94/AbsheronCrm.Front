import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import TerminalItem from 'src/app/model/terminal-item';
import { TerminalService } from 'src/app/services/terminal.service';

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
        public dialog: MatDialog) { }

    ngOnInit(): void {
        this.getTerminalOrders();
    }

    private delete(id: number) {
        this.terminalService
            .deleteTerminalOrder(id)
            .subscribe(response => {
                switch(response.status) {
                case 400: case 500:
                    // TODO: POPUP
                    console.log('error');
                    break;
                case 404:
                    // TODO: POPUP
                    console.log('already deleted');
                    break;
                default:
                    this.getTerminalOrders();
                }
            });
    }

    // openDialog(orderNumber: number) {
    //     const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //         width: '250px',
    //         data: orderNumber
    //     });

    //     dialogRef.afterClosed().subscribe((result: number | undefined) => {
    //         if(!result) {
    //             return;
    //         }
    //         console.log(result);
    //     });
    // }

    private getTerminalOrders() {
        this.terminalService
            .getTerminalOrders()
            .subscribe(terminalItems => {
                this.dataSource = new MatTableDataSource<TerminalItem>(terminalItems);
                this.dataSource.paginator = this.paginator;
            });
    }
}
