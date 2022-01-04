import { Component, OnInit } from '@angular/core';
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

export interface Xidmet {
    expenseId: number,
    expenseText: string,
    temrinalWay: TerminalWay,
    count: number,
    totalAmount: number,
    edv: number
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

    constructor(
        private terminalService: TerminalService,
        private router: Router,
        private route: ActivatedRoute,
        private location: Location) {
        // this.customer = this.terminalService.customer;
        // this.orderDate = this.terminalService.orderDate;
        // this.route.queryParams.subscribe(params => {
        //     this.orderId = params['orderId'];
        //     const fromReturnFile = params['fromReturnFile'];
        //     if(this.orderId !== undefined && fromReturnFile === undefined) {
        //         this.terminalService.getUpdateTerminalData(Number(this.orderId)).subscribe(updateTerminalData => {
        //             this.setXidmetlerUpdate(updateTerminalData);
        //         });
        //         return;
        //     }
        // });
    }

    goBack() {
        this.location.back();
    }

    ngOnInit() {
        const terminalUpdateData = this.terminalService.terminalUpdateData;
        if(terminalUpdateData) {
            this.initialCreateLoad(terminalUpdateData);
            return;
        }
        this.route.queryParams
            .subscribe(params => {
                this.orderId = params['orderId'];
                const fromReturnFile = params['fromReturnFile'];
                if(this.orderId === undefined && fromReturnFile !== undefined) {
                    this.setXidmetlerFromUpdateRequestData();
                }
                if(this.orderId !== undefined && fromReturnFile === undefined) {
                    this.terminalService.getUpdateTerminalData(Number(this.orderId)).subscribe(updateTerminalData => {
                        this.setXidmetlerUpdate(updateTerminalData);
                    });
                    return;
                }
                logger.info(this.terminalService.terminalUpdateRequestData);
            });
    }

    private initialCreateLoad(initialLoadData: TerminalUpdateData) {
        // coming from new-order component
        this.customer = this.terminalService.customer;
        this.orderDate = this.terminalService.orderDate;
        this.expenses = initialLoadData.expenses;
        this.transportTypeId = initialLoadData.transportTypeId;

        const terminalWays = initialLoadData.terminalWays;
        const expenses = this.expenses.filter(e => e.isSelected);
        // xidmetler
        const xidmetler_: Xidmet[] = [];
        for(const tw of terminalWays) {
            // tw.amount = 1;
            for(const exp of expenses) {
                xidmetler_.push({
                    expenseId: exp.id,
                    expenseText: exp.text,
                    temrinalWay: tw,
                    count: 1,
                    totalAmount: tw.amount,
                    edv: tw.amount * EDV_MULTIPLIER
                });
            }
        }
        this.xidmetler = xidmetler_;
        // total amount and total amount with EDV
        for(const x of xidmetler_) {
            this.total += x.totalAmount;
            this.totalEdv += x.totalAmount + x.edv;
        }
    }

    private initalUpdateLoad() {
        logger.warning('INITIAL UPDATE LOAD NOT IMPLEMENTED');
    }

    private toFIlesInitial() {
        logger.warning('TO FILES INITIAL NOT IMPLEMENTED');
    }

    private toFiles() {
        logger.warning('TO FILES NOT IMPLEMENTED');
    }

    private fromFiles() {
        logger.warning('FROM FILES NOT IMPLEMENTED');
    }



    private setXidmetlerFromUpdateRequestData() {
        const updateReqData = this.terminalService.terminalUpdateRequestData!;
        this.transportTypeId = updateReqData.transportTypeId!;
        this.expenses = this.terminalService.expenses!;
        this.fullRefCode = updateReqData.fullRefCode;
        this.emptyRefCode = updateReqData.emptyRefCode;
        this.notes = updateReqData.notes;
        this.total = this.terminalService.totalAmount!;
        this.totalEdv = this.terminalService.totalEdv!;
        this.xidmetler = this.terminalService.xidmetler!;
        this.files = updateReqData.files!;
        this.customer = this.terminalService.customer;
        this.orderDate = this.terminalService.orderDate;
        this.orderNo = this.terminalService.orderNo;
    }

    private setXidmetlerUpdate(updateTerminalData: TerminalDataForUpdate) {
        this.transportTypeId = updateTerminalData.transPortTypeId;
        this.expenses = updateTerminalData.expenses;
        this.fullRefCode = updateTerminalData.fullRefCode;
        this.emptyRefCode = updateTerminalData.emptyRefCode;
        this.notes = updateTerminalData.notes;
        this.total = updateTerminalData.total;
        this.totalEdv = updateTerminalData.endTotal;
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
        this.files = updateTerminalData.filelar.map(f => {return {
            id: f.id,
            nvNo: f.nvNo,
            uri: f.uri
        };});
        this.customer = updateTerminalData.customer;
        this.orderDate = updateTerminalData.orderDate;
        this.orderNo = updateTerminalData.orderNo;
        logger.info(this.orderDate);
    }

    private setXidmetlerNew(terminalWays: TerminalWay[], expenses: TerminalExpense[]) {
        // xidmetler
        const xidmetler_: Xidmet[] = [];
        for(const tw of terminalWays) {
            // tw.amount = 1;
            for(const exp of expenses) {
                xidmetler_.push({
                    expenseId: exp.id,
                    expenseText: exp.text,
                    temrinalWay: tw,
                    count: 1,
                    totalAmount: tw.amount,
                    edv: tw.amount * EDV_MULTIPLIER
                });
            }
        }
        this.xidmetler = xidmetler_;
        // total amount and total amount with EDV
        for(const x of xidmetler_) {
            this.total += x.totalAmount;
            this.totalEdv += x.totalAmount + x.edv;
        }
    }

    increaseCount(xidmet: Xidmet) {
        xidmet.count++;
        xidmet.totalAmount += xidmet.temrinalWay.amount!;
        this.total += xidmet.temrinalWay.amount!;
        this.totalEdv += (xidmet.edv + xidmet.temrinalWay.amount!);
    }

    decreaseCount(xidmet: Xidmet) {
        if(xidmet.count === 1) {
            return;
        }
        xidmet.count--;
        xidmet.totalAmount -= xidmet.temrinalWay.amount!;
        this.total -= xidmet.temrinalWay.amount!;
        this.totalEdv -= (xidmet.edv + xidmet.temrinalWay.amount!);
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
            this.totalEdv += x.totalAmount;
            this.total += x.totalAmount;
        }
    }

    toReturnFile() {
        if(this.terminalService.terminalUpdateRequestData === undefined) {
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
            if(this.orderId !== undefined) {
                this.terminalService.expenses = this.expenses;
                this.terminalService.totalEdv = this.totalEdv;
                this.terminalService.totalAmount = this.total;
                this.terminalService.xidmetler = this.xidmetler;
                const navigationExtras: NavigationExtras = {
                    queryParams: {
                        orderId: this.orderId
                    }
                };
                this.router.navigate(['/returnFile'], navigationExtras);
                return;
            }
            this.router.navigate(['/returnFile']);
            return;
        }
        this.terminalService.terminalUpdateRequestData.emptyRefCode = this.emptyRefCode;
        this.terminalService.terminalUpdateRequestData.fullRefCode = this.fullRefCode;
        this.terminalService.terminalUpdateRequestData.notes = this.notes;
        this.terminalService.terminalUpdateRequestData.xidmetler =
        this.xidmetler.map(x => {return {
            edv: x.edv,
            expenseId: x.expenseId,
            miqdar: x.count,
            nvNo: x.temrinalWay.nvNo,
            qiymet: x.temrinalWay.amount == null ? 0 : x.temrinalWay.amount
        };});
        this.terminalService.terminalUpdateRequestData.transportTypeId = this.transportTypeId;
        this.terminalService.terminalUpdateRequestData.files = this.files;
        if(this.orderId !== undefined) {
            this.terminalService.expenses = this.expenses;
            this.terminalService.totalEdv = this.totalEdv;
            this.terminalService.totalAmount = this.total;
            this.terminalService.xidmetler = this.xidmetler;
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

    createTerminalOrder(save = true) {
        try {
            if(this.orderId !== undefined) {
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
                if(this.terminalService.terminalUpdateRequestData === undefined) {
                    errorAlert('Faylları doldurun!');
                    return;
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
                this.terminalService.terminalUpdateRequestData.statusId = save ? 4 : 5;
                this.terminalService.terminalUpdateRequestData.files = this.files;
            }
            if(this.orderId === undefined) {
                this.terminalService
                    .createTerminalOrder()
                    .subscribe({
                        next: () => {
                            successAlert('Yeni terminal sifarişi yaradıldı', 'Uğurlu')
                                .then(res => {
                                    if(res.isConfirmed) {
                                        this.router.navigate(['//services']);
                                    }
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
                            if(res.isConfirmed) {
                                this.router.navigate(['//services']);
                            }
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

    deleteXidmet(i: number) {
        const xidmetToDelete = this.xidmetler[i];
        this.xidmetler.splice(i, 1);
        this.total -= xidmetToDelete.temrinalWay.amount!;
        this.totalEdv -= (xidmetToDelete.edv + xidmetToDelete.temrinalWay.amount!);
    }
}
