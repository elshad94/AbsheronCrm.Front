import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PayBank } from 'src/app/model/payBank';
import { PayBankFile } from 'src/app/model/payBankFile';
import { Payments } from 'src/app/model/payments';
import { FileData } from 'src/app/model/returnFileFileData';
import { FileService } from 'src/app/services/file.service';
import { PayBankService } from 'src/app/services/payBank.service';
import { errorAlert } from 'src/utils/alerts';
import logger from 'src/utils/logger';
import Swal from 'sweetalert2';
import { PayModalComponent } from '../pay-modal/pay-modal.component';

@Component({
  selector: 'app-last-modal',
  templateUrl: './last-modal.component.html',
  styleUrls: ['./last-modal.component.scss']
})
export class LastModalComponent implements OnInit {

  constructor(private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Payments,
    private fileService: FileService,
    private payBank: PayBankService) {
  }
  fileToUploadNvNo!: string;
  fileToUpload?: File;
  fileName = '';

  ngOnInit(): void {
  }

  setFile(event: any) {
    this.fileToUpload = event.target.files[0];
    this.fileName = this.fileToUpload?.name ?? '';
  }

  uploadFile() {
    if (!this.fileToUpload) {
      logger.error('FILE UNDEFINED');
    }
    this.fileService.createFilePank(this.fileToUpload!)
      .subscribe({
        next: res => {
          this.paymentBank(res.fileId);
        },
        error: res => {
          errorAlert('Server problemi');
          logger.error('FILE UNDEFINED: ', res.error);
        }
      });
  }

  private paymentBank(fileid: number){
    const newPayBank: PayBank = {
      orderId: this.data.orderId,
      orderType: this.data.orderTypeId,
      fileId: fileid
    };
  
      this.payBank.payBankMet(newPayBank).subscribe(success =>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${this.data.orderNo} sifarişin ödəməsi uğurla qeydə alındı`,
          showConfirmButton: false,
          timer: 2500
        })
        this.payBank.isPaymentSuccesfull = true;
        this.dialogRef.closeAll()
      },
      error =>{
        Swal.fire({
          icon: 'error',
          title: 'Uğursuz əməliyyat...',
          text: 'Server xətası'
        })
      })
    }
  

}
