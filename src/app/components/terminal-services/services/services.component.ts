import { Component, OnInit, ViewChild } from '@angular/core';
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

    constructor(private terminalService: TerminalService,) { }

    ngOnInit(): void {
        this.terminalService
            .getTerminalOrders()
            .subscribe(terminalItems => {
                this.dataSource = new MatTableDataSource<TerminalItem>(terminalItems);
                this.dataSource.paginator = this.paginator;
            });
    }
}
