import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { TerminalWay } from 'src/app/model/terminal-new-data';
import { TerminalExpense } from 'src/app/model/TerminalExpense';
import { TerminalService } from 'src/app/services/terminal.service';
import { successAlert, errorAlert } from 'src/utils/alerts';
import errorCodes from 'src/utils/errorCodes';
import logger from 'src/utils/logger';
import { Location } from '@angular/common';
import { TerminalDataForUpdate, TerminalXidmet } from 'src/app/model/TerminalUpdateData';
import { FileData } from 'src/app/model/returnFileFileData';
import { TerminalUpdateData } from 'src/app/model/terminal-update-data';
import { TITLE } from 'src/utils/contants';
import { Title, SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import isEditable from 'src/utils/isEditable';

export interface Xidmet {
    expenseId: number,
    expenseText: string,
    temrinalWay: TerminalWay,
    count: number,
    totalAmount: number,
    edv: number,
    isAmountInValid?: boolean
}

const EDV_MULTIPLIER = 0.18;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  expenses!: TerminalExpense[];
  xidmetler!: Xidmet[];
  total = 0;
  totalEdv = 0;
  notes = '';
  fullRefCode = '';
  emptyRefCode = '';
  transportTypeId!: number;
  orderId?: number;
  files: FileData[] = [];
  customer?: string;
  orderDate?: Date;
  orderNo?: string;
  orderStatus?: number;
  invStatus: number = -1;
  itmUrl?: string;
  urlSafe?: SafeResourceUrl;


  constructor(
        private terminalService: TerminalService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location,
        private titleService: Title,
        public sanitizer: DomSanitizer) {
  }

  isEditable = () => isEditable(this.orderStatus);

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.titleService.setTitle(`Terminal${TITLE}`);
    const terminalUpdateData = this.terminalService.terminalUpdateData;
    if(terminalUpdateData !== undefined) {
      this.initialCreateLoad(terminalUpdateData);
      this.terminalService.terminalUpdateData = undefined;
      return;
    }
    this.route.queryParams
      .subscribe(params => {
        const fromReturnFile: boolean = params['fromReturnFile'];
        this.orderId = params['orderId'];
        if(fromReturnFile) {
          this.fromFiles();
          return;
        }
        if(this.orderId !== undefined && fromReturnFile === undefined) {
          this.terminalService.getUpdateTerminalData(Number(this.orderId)).subscribe(updateTerminalData => {
            this.initialUpdateLoad(updateTerminalData);
          });
        }
      });

      if (isNaN(this.orderId!)) {
        return
      }
      this.terminalService.printInv((Number(this.orderId))).subscribe(res =>{
        this.invStatus = res
      })
  }


  private initialCreateLoad(initialLoadData: TerminalUpdateData) {
    // coming from new-order component
    this.customer = this.terminalService.customer;
    this.orderDate = this.terminalService.orderDate;
    this.expenses = initialLoadData.expenses;
    this.transportTypeId = initialLoadData.transportTypeId;
    this.files = [];
    const terminalWays = initialLoadData.terminalWays;
    const expenses = this.expenses.filter(e => e.isSelected);
    // xidmetler
    const xidmetler_: Xidmet[] = [];
    for(const tw of terminalWays) {
      for(const exp of expenses) {
        xidmetler_.push({
          expenseId: exp.id,
          expenseText: exp.text,
          temrinalWay: {
            ...tw,
            amount: exp.price!
          },
          count: 1,
          totalAmount: exp.price!,
          edv: exp.price! * EDV_MULTIPLIER
        });
      }
    }
    this.xidmetler = xidmetler_;
    // total amount and total amount with EDV
    for(const x of xidmetler_) {
      this.total += x.totalAmount;
      this.totalEdv += x.edv * x.count;
    }
  }

  private initialUpdateLoad(updateTerminalData: TerminalDataForUpdate) {
    // coming from services component
    this.orderStatus = updateTerminalData.orderStatus;
    this.transportTypeId = updateTerminalData.transPortTypeId;
    this.expenses = updateTerminalData.expenses;
    this.fullRefCode = updateTerminalData.fullRefCode;
    this.emptyRefCode = updateTerminalData.emptyRefCode;
    this.notes = updateTerminalData.notes;
    this.total = updateTerminalData.total;
    this.xidmetler = updateTerminalData.xidmetler.map(x => {return {
      count: x.miqdar,
      edv: x.edv,
      expenseId: x.expenseId,
      totalAmount: x.cemi,
      temrinalWay: {
        nvNo: x.nvNo,
        amount: x.qiymet,
        isSelected: true,
      },
      expenseText: this.expenses.filter(exp => exp.id == x.expenseId)[0].text
    };});
    for(const x of this.xidmetler ) {
      this.totalEdv += x.edv * x.count;
    }
    for(let i = 0; i < this.expenses.length; i++) {
      this.xidmetler[i].edv = this.expenses[i].eX_SVAT;
    }
    this.files = updateTerminalData.filelar.map(f => {return {
      id: f.id,
      nvNo: f.nvNo,
      uri: f.uri
    };});
    this.customer = updateTerminalData.customer;
    this.orderDate = updateTerminalData.orderDate;
    this.orderNo = updateTerminalData.orderNo;
  }

  toReturnFile() {
    if(this.terminalService.terminalUpdateRequestData === undefined) {
      this.toFilesInitial();
      return;
    }
    this.toFiles();
  }

  private toFilesInitial() {
    this.terminalService.orderStatus = this.orderStatus;
    // switching to return-files component tab for the first time
    this.terminalService.terminalUpdateRequestData = {
      emptyRefCode: this.emptyRefCode,
      fullRefCode: this.fullRefCode,
      notes: this.notes,
      files: this.files,
      xidmetler: this.xidmetler.map(x => {return {
        edv: x.edv,
        expenseId: x.expenseId,
        miqdar: x.count,
        nvNo: x.temrinalWay.nvNo,
        qiymet: x.temrinalWay.amount == null ? 0 : x.temrinalWay.amount
      };}),
      transportTypeId: this.transportTypeId
    };
    this.copyExtraFieldsToService();
    if(this.orderId !== undefined) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          orderId: this.orderId
        }
      };
      this.router.navigate(['/returnFile'], navigationExtras);
      return;
    }
    this.router.navigate(['/returnFile']);
  }

  private toFiles() {
    // switching to return-files component tab for subsequent times
    this.terminalService.orderStatus = this.orderStatus;
    if(this.terminalService.terminalUpdateRequestData === undefined) {
      throw 'terminalUpdateRequestData is undefined';
    }
    this.terminalService.terminalUpdateRequestData.emptyRefCode = this.emptyRefCode;
    this.terminalService.terminalUpdateRequestData.fullRefCode = this.fullRefCode;
    this.terminalService.terminalUpdateRequestData.notes = this.notes;
    this.terminalService.terminalUpdateRequestData.xidmetler = this.xidmetler.map(x => {return {
      edv: x.edv,
      expenseId: x.expenseId,
      miqdar: x.count,
      nvNo: x.temrinalWay.nvNo,
      qiymet: x.temrinalWay.amount == null ? 0 : x.temrinalWay.amount
    };});
    this.terminalService.terminalUpdateRequestData.transportTypeId = this.transportTypeId;
    this.terminalService.terminalUpdateRequestData.files = this.files;
    this.copyExtraFieldsToService();
    if(this.orderId !== undefined) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          orderId: this.orderId
        }
      };
      this.router.navigate(['/returnFile'], navigationExtras);
      return;
    }
    this.router.navigate(['/returnFile']);
  }

  private fromFiles() {
    this.orderStatus = this.terminalService.orderStatus;
    // switching tabs from return-file component
    if(this.terminalService.terminalUpdateRequestData === undefined) {
      throw 'temrinalUpdateRequestData is undefined';
    }
    if(this.terminalService.terminalUpdateRequestData.transportTypeId === undefined) {
      throw 'transportTypeId is undefined';
    }
    this.transportTypeId = this.terminalService.terminalUpdateRequestData.transportTypeId;
    this.fullRefCode = this.terminalService.terminalUpdateRequestData.fullRefCode;
    this.emptyRefCode = this.terminalService.terminalUpdateRequestData.emptyRefCode;
    this.notes = this.terminalService.terminalUpdateRequestData.notes;
    if(this.terminalService.terminalUpdateRequestData.files === undefined) {
      throw 'files is undefined';
    }
    this.files = this.terminalService.terminalUpdateRequestData.files;
    this.copyExtraFieldsFromService();
  }

  private copyExtraFieldsToService() {
    this.terminalService.expenses = this.expenses;
    this.terminalService.totalEdv = this.totalEdv;
    this.terminalService.totalAmount = this.total;
    this.terminalService.xidmetler = this.xidmetler;
    this.terminalService.customer = this.customer;
    this.terminalService.orderDate = this.orderDate;
    this.terminalService.orderNo = this.orderNo;
    this.terminalService.isValid = this.isValid();
  }

  private copyExtraFieldsFromService() {
    if(this.terminalService.expenses === undefined) {throw 'expenses is undefined';}
    this.expenses = this.terminalService.expenses;
    if(this.terminalService.totalEdv === undefined) {throw 'totalEdv is undefined';}
    this.totalEdv = this.terminalService.totalEdv;
    if(this.terminalService.totalAmount === undefined) {throw 'totalAmount is undefined';}
    this.total = this.terminalService.totalAmount;
    if(this.terminalService.xidmetler === undefined) {throw 'xidmetler is undefined';}
    this.xidmetler = this.terminalService.xidmetler;
    this.customer = this.terminalService.customer;
    this.orderDate = this.terminalService.orderDate;
    this.orderNo = this.terminalService.orderNo;
  }

  setXidmetPrice(xidmet: Xidmet, event: Event) {
    const target = event.target as HTMLInputElement;
    const expenseId = Number(target.value);
    this.terminalService
      .getExpensePrice(expenseId)
      .subscribe(price => {
        this.total -= xidmet.totalAmount!;
        this.totalEdv -= (
          xidmet.edv
        );

        xidmet.temrinalWay.amount = price;
        xidmet.totalAmount = price * xidmet.count;

        this.total += xidmet.totalAmount!;
        this.totalEdv += (
          xidmet.edv
        );
      })
  }

  changeCount(xidmet: Xidmet, event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.valueAsNumber
    if(value < 1 || isNaN(value)) {
      event.preventDefault();
      xidmet.isAmountInValid = true;
      return;
    }
    if(`${value}`.length > 3) {
      event.preventDefault();
      xidmet.isAmountInValid = true;
      return;
    }
    xidmet.isAmountInValid = false;
    // remove old xidmet amount from total
    this.total -= xidmet.totalAmount!;
    this.totalEdv -= xidmet.totalAmount * xidmet.edv / 100;
    // update xidmet count and amoount
    xidmet.count = value;
    xidmet.totalAmount = value * xidmet.temrinalWay.amount;
    // update total amount
    this.total += xidmet.totalAmount!;
    this.totalEdv += xidmet.totalAmount * xidmet.edv / 100;
  }

  isValid(): boolean {
    if(this.xidmetler) {
      return this.xidmetler.some(x =>x.isAmountInValid);
    }
    return true;
  }

  increaseCount(xidmet: Xidmet) {
    xidmet.count++;
    xidmet.totalAmount += xidmet.temrinalWay.amount!;
    this.total += xidmet.temrinalWay.amount!;
    this.totalEdv += (
      xidmet.edv
    );
  }

  decreaseCount(xidmet: Xidmet) {
    if(xidmet.count === 1) {
      return;
    }
    xidmet.count--;
    xidmet.totalAmount -= xidmet.temrinalWay.amount!;
    this.total -= xidmet.temrinalWay.amount!;
    this.totalEdv -= (
      xidmet.edv
    );
  }

  deleteXidmet(i: number) {
    const xidmetToDelete = this.xidmetler[i];
    this.xidmetler.splice(i, 1);
    this.total -= xidmetToDelete.totalAmount!;
    this.totalEdv -= (
      xidmetToDelete.edv
    );
  }

  addXidmet() {
    this.xidmetler.push({
      expenseId: this.expenses[0].id,
      expenseText: this.expenses[0].text,
      count: 1,
      temrinalWay: {
        nvNo: '',
        amount: 0
      },
      totalAmount: 0,
      edv: 0
    });
    this.total = this.xidmetler
      .map(x => x.totalAmount)
      .reduce((prev, next) => next + prev, 0);
    for(const x of this.xidmetler) {
      this.totalEdv += x.edv;
      // this.totalEdv += x.totalAmount;
      this.total += x.totalAmount;
    }
  }

  createTerminalOrder(save = true) {
    try {
      if(this.orderId !== undefined || this.terminalService.terminalUpdateRequestData == undefined) {
        this.terminalService.terminalUpdateRequestData = {
          emptyRefCode: this.emptyRefCode,
          fullRefCode: this.fullRefCode,
          notes: this.notes,
          files: this.files,
          xidmetler: this.xidmetler.map(x => {return {
            edv: x.edv,
            expenseId: x.expenseId,
            miqdar: x.count,
            nvNo: x.temrinalWay.nvNo,
            qiymet: x.temrinalWay.amount == null ? 0 : x.temrinalWay.amount
          };}),
          transportTypeId: this.transportTypeId,
          statusId: save ? 4 : 5
        };
      } else {
        // if(this.terminalService.terminalUpdateRequestData === undefined) {
        //   errorAlert('Faylları doldurun!');
        //   return;
        // }
        this.terminalService.terminalUpdateRequestData.emptyRefCode = this.emptyRefCode;
        this.terminalService.terminalUpdateRequestData.fullRefCode = this.fullRefCode;
        this.terminalService.terminalUpdateRequestData.notes = this.notes;
        this.terminalService.terminalUpdateRequestData.xidmetler = this.xidmetler.map(x => {return {
          edv: x.edv,
          expenseId: x.expenseId,
          miqdar: x.count,
          nvNo: x.temrinalWay.nvNo,
          qiymet: x.temrinalWay.amount == null ? 0 : x.temrinalWay.amount
        };});
        this.terminalService.terminalUpdateRequestData.transportTypeId = this.transportTypeId;
        this.terminalService.terminalUpdateRequestData.statusId = save ? 4 : 5;
        this.terminalService.terminalUpdateRequestData.files = this.files;
      }
      if(this.orderId === undefined) {
        this.terminalService.totalEdv = this.totalEdv;
        this.terminalService
          .createTerminalOrder()
          .subscribe({
            next: () => {
              successAlert('Yeni terminal sifarişi yaradıldı', 'Uğurlu')
                .then(() => {
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
      this.terminalService.totalEdv = this.totalEdv;
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


  printInv(){
    if (this.invStatus == null || this.invStatus == undefined) {
      alert()
      return;

    }
    // this.itmUrl = `http://85.132.108.234/Frm_ProInvoice_Print.aspx?inv_id=${this.invStatus}&isYesNo=NO`;
    // this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.itmUrl);

    const src = `http://85.132.108.234/Frm_ProInvoice_Print.aspx?inv_id=${this.invStatus}&isYesNo=NO`;
    $('#printFrame').attr('src', src);
  }


}
