import { Component, OnInit } from '@angular/core';
import { isErrorResponse } from 'src/app/model/ErrorResponse';
import { FileData } from 'src/app/model/returnFileFileData';
import { FileService } from 'src/app/services/file.service';
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
    fileToUploadNvNo!: string;
    fileToUpload?: File;
    fileName = '';

    constructor(
      private terminalService: TerminalService,
      private fileService: FileService) { }

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

    setFile(event: any) {
        this.fileToUpload = event.target.files[0];
        this.fileName = this.fileToUpload?.name ?? '';
    }

    uploadFile() {
        logger.info(this.fileToUpload);
        if(!this.fileToUpload) {
        //TODO: show popup
            logger.error('FILE UNDEFINED');
        }
        this.fileService.createFile(this.fileToUpload!, this.fileToUploadNvNo)
            .subscribe(res => {
                if(isErrorResponse(res)) {
                    // TODO: show popup
                    logger.error('FILE UNDEFINED: ', res.error);
                    return;
                }
                logger.info(res);
                this.files.push({
                    id: res.fileId,
                    nvNo: this.fileToUploadNvNo,
                    //uri: res.uri // TODO: remove everything before \\
                    uri: res.uri.split('!@#$%^&').pop()!
                });
            });
    }
}
