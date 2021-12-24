import { Component, OnInit } from '@angular/core';
import TerminalItem from 'src/app/model/terminal-item';
import { TerminalService } from 'src/app/services/terminal.service';

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
    terminalOrders: TerminalItem[] = [];

    constructor(private terminalService: TerminalService,) { }

    ngOnInit(): void {
        this.terminalService
            .getTerminalOrders()
            .subscribe(terminalItems => {
                this.terminalOrders = terminalItems;
            });
    }

}
