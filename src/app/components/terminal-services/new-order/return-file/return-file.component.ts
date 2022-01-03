import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/app/model/returnFileFileData';
import { FileService } from 'src/app/services/file.service';
import { TerminalService } from 'src/app/services/terminal.service';
import { errorAlert, successAlert } from 'src/utils/alerts';
import errorCodes from 'src/utils/errorCodes';
import logger from 'src/utils/logger';
import Swal from 'sweetalert2';

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
            // TODO: if there is no id, redirect to first part of terminal creation
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
        if(!this.fileToUpload) {
            logger.error('FILE UNDEFINED');
        }
        this.fileService.createFile(this.fileToUpload!, this.fileToUploadNvNo)
            .subscribe({
                next: res => {
                    logger.info(res);
                    this.files.push({
                        id: res.fileId,
                        nvNo: this.fileToUploadNvNo,
                        uri: res.uri.split('!@#$%^&').pop() ?? ''
                    });
                },
                error: res => {
                    errorAlert('Server problemi');
                    logger.error('FILE UNDEFINED: ', res.error);
                }
            });
    }

    createTerminalOrder() {
        try {
          this.terminalService.terminalUpdateRequestData!.files = this.files;
          this.terminalService
              .createTerminalOrder()
              .subscribe({
                  next: () => successAlert('Yeni terminal sifarişi yaradıldı', 'Uğurlu'),
                  error: res => {
                      logger.error(res.error);
                      errorAlert(res.error.error, 'Uğursuz'); // TODO: double check errror.error exists
                  }
              });
        } catch(exception) {
            switch(exception) {
            case errorCodes.REQUEST_DATA_UNDEFINED:
                logger.error('REQUEST_DATA_UNDEFINED');
                errorAlert('Bütün xanaları doldurun!');
                break;
            case errorCodes.EMPTY_REF_CODE_EMPTY:
                logger.error('EMPTY_REF_CODE_EMPTY');
                errorAlert('Boş yükdaşıma kodunu daxil edin!');
                break;
            case errorCodes.FILES_EMPTY:
                logger.error('FILES_EMPTY');
                errorAlert('Ən azı bir fayl seçin!');
                break;
            case errorCodes.FULL_REF_CODE_EMPTY:
                logger.error('FULL_REF_CODE_EMPTY');
                errorAlert('Dolu yükdaşıma kodunu daxil edin!');
                break;
            case errorCodes.XIDMETLER_EMPTY:
                logger.error('XIDMETLER_EMPTY');
                errorAlert('Ən azı bir xidmət seçin!');
                break;
            default:
                throw exception;
            }
        }
    }
}
