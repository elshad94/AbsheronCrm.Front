import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/app/model/returnFileFileData';
import { TerminalService } from 'src/app/services/terminal.service';
import logger from 'src/utils/logger';

@Component({
    selector: 'app-return-file',
    templateUrl: './return-file.component.html',
    styleUrls: ['./return-file.component.scss']
})
export class ReturnFileComponent implements OnInit {
    nvNoList!: string[];  
    files!: FileData[];

    constructor(private terminalService: TerminalService) { }

    ngOnInit(): void {
        if(!this.terminalService.terminalUpdateRequestData) {
            // TODO: redirect to first part of the terminal update screen if there is id
            // if there is no id, redirect 
            logger.error('NOT IMPLEMNETED!');
            return;
        }
        this.nvNoList = this.terminalService.terminalUpdateRequestData
            .xidmetler.map(x => x.nvNo);
        this.files = this.terminalService.terminalUpdateRequestData.files ?? [];
    }

    // TODO: fill terminalUpdateRequestData before redirecting to Xidmetler screen
}
