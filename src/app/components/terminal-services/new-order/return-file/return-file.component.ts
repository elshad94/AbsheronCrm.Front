import { Component, OnInit } from '@angular/core';
import { FileData } from 'src/app/model/returnFileFileData';
import { FileService } from 'src/app/services/file.service';
import { TerminalService } from 'src/app/services/terminal.service';
import { errorAlert, successAlert } from 'src/utils/alerts';
import errorCodes from 'src/utils/errorCodes';
import logger from 'src/utils/logger';
import { saveAs } from 'file-saver';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-return-file',
  templateUrl: './return-file.component.html',
  styleUrls: ['./return-file.component.scss']
})
export class ReturnFileComponent implements OnInit {
  nvNoList!: string[];
  files!: FileData[];
  fileToUploadNvNo: string = '-1';
  fileToUpload?: File;
  fileName = '';
  orderId?: number;
  orderDate?: Date;
  customer?: string;
  orderNo?: string;
  orderStatus?: number;

  constructor(
      private terminalService: TerminalService,
      private fileService: FileService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location) {
  }

  ngOnInit() {
    this.copyExtraFieldsFromService();
    this.route.queryParams
      .subscribe(params => {
        this.orderId = params['orderId'];
      });
    if(this.terminalService.terminalUpdateRequestData === undefined) {
      throw 'terminalUpdateRequestData is undefined';
    }
    this.orderStatus = this.terminalService.orderStatus;
    this.nvNoList = [...new Set(this.terminalService.terminalUpdateRequestData
      .xidmetler.map(x => x.nvNo))];
    if(this.terminalService.terminalUpdateRequestData.files === undefined) {
      throw 'files is undefined';
    }
    this.files = this.terminalService.terminalUpdateRequestData.files;
    for(const file of this.files) {
      file.uri =  file.uri.split('!@#$%^&').pop() ?? '';
    }
  }

  goBack() {
    this.location.back();
  }

  setFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if(target.files === null) {
      throw 'event files is undefined';
    }
    this.fileToUpload = target.files[0];
    this.fileName = this.fileToUpload?.name ?? '';
  }

  uploadFile() {
    if(!this.fileToUpload) {
      throw 'FILE UNDEFINED';
      return;
    }
    this.fileService.createFile(this.fileToUpload, this.fileToUploadNvNo)
      .subscribe({
        next: res => {
          this.files.push({
            id: res.fileId,
            nvNo: this.fileToUploadNvNo,
            uri: res.uri.split('!@#$%^&').pop() ?? ''
          });
          successAlert('Fayl yüklənildi', 'Uğurlu');
        },
        error: res => {
          errorAlert(res.error.error);
        }
      });
  }

  openFile(id: number) {
    this.fileService.getFile(id).subscribe((response: any) => {
      const blob = new Blob([response], { type: response.type });
      saveAs(blob);
    });
  }

  createTerminalOrder(save = true) {
    try {
      if(this.terminalService.terminalUpdateRequestData === undefined) {
        errorAlert('Faylları doldurun!');
        return;
      }
      this.terminalService.terminalUpdateRequestData.files = this.files;
      this.terminalService.terminalUpdateRequestData.statusId = save ? 4 : 5;
      if(this.orderId === undefined) {
        this.terminalService
          .createTerminalOrder()
          .subscribe({
            next: () => {
              successAlert('Yeni terminal sifarişi yaradıldı', 'Uğurlu').then(res => {
                this.router.navigate(['//services']);
              });
            },
            error: res => {
              logger.error(res.error);
              errorAlert(res.error.error, 'Uğursuz');
            }
          });
        return;
      }
      this.terminalService
        .updateTerminalOrder(this.orderId)
        .subscribe({
          next: () => {
            successAlert('Terminal sifarişi guncellendi', 'Uğurlu').then(res => {
              this.router.navigate(['//services']);
            });
          },
          error: res => {
            logger.error(res.error);
            errorAlert(res.error.error, 'Uğursuz');
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

  private copyExtraFieldsFromService() {
    this.customer = this.terminalService.customer;
    this.orderDate = this.terminalService.orderDate;
    this.orderNo = this.terminalService.orderNo;
  }

  toXidmetler() {
    this.terminalService.orderStatus = this.orderStatus;
    if(this.terminalService.terminalUpdateRequestData === undefined) {
      throw 'terminalUpdateRequestData is undefined';
    }
    this.terminalService.terminalUpdateRequestData.files = this.files;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        orderId: this.orderId,
        fromReturnFile: true
      }
    };
    this.router.navigate(['/order'], navigationExtras);
  }

  deleteFile(i: number) {
    this.files.splice(i, 1);
  }

  changeFileNvNo(index: number, nvNo: string) {
    this.files[index].nvNo = nvNo;
  }
}
