import { FormControl, FormGroup } from '@angular/forms';
import { Expense,fileDetails,TransportType,
} from './../../../model/broker-request.model';
import { DocumentType } from './../../../model/broker-request.model';
// import { fileDetails } from './../../../model/broker-request.model';
// import { TransportType } from './../../../model/broker-request.model';
import { BrokerRequestItem } from 'src/app/model/broker-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BrokerItem } from './../../../model/broker-item';
import { BrokerItemService } from './../../../services/broker-item.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import Swal from 'sweetalert2';
import {errorAlert} from '../../../../utils/alerts';

import 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';

import {BrokerPostItem,FileDetailItem,} from 'src/app/model/broker-post-item.model';


interface FileDetails {
  fileId?: number,
  docTypeId?: number,
  uri?: string
}

@Component({selector: 'app-broker-order',templateUrl: './broker-order.component.html',styleUrls: ['./broker-order.component.scss'],
})
export class BrokerOrderComponent implements OnInit {
  form!: FormGroup;
  id: any;
  isSelected: any;
  Checkbox: any = [];
  data!: BrokerItem;
  transportTypes: any = [];
  documentTypes: any = [];
  expenses: Expense[] = [];
  documents: any = [];
  transportNumber: any;
  docTypeId: any;
  // fileNames: string[] = [""];
  files: FileDetails[] = [{ docTypeId: 10 }];
  notes: any;
  scan: any = this.documents.uri;
  url: any;
  orderIdQueryParam?: string;
  orderStatus?: number;


  date = new Date().toLocaleDateString();
  DocumentType: DocumentType = {
    documentTypeId: 0,
    name: '',
  };

  Expense: Expense = {
    id: 0,
    isSelected: true,
    text: '',
  };

  Document: fileDetails = {
    documentTypeId: 0,
    uri: '',
    fileId: 0,
  };
  TransportType: TransportType = {
    id: 0,
    text: '',
  };
  brokerItemModel: BrokerRequestItem = {
    expenses: [],
    transportNo: '',
    transportTypeId: 0,
    notes: '',
    documentTypes: [],
    documents: [],
    transportTypes: [],
    docNo: '',
    customerName: '',
    date: '',
    totalCost: 0,

  };

  //  brokerItemss: BrokerItem = {
  //     orderId: 0,
  //     docNo: '',
  //     date: '',
  //     customer: '',
  //     gbNo: '',
  //     amount: '',
  //   }
  //FOR SAVE

  fileDetailsForRequest: FileDetailItem = {
    docTypeId: 0,
    fileId: 0,
  };
  expenseModel: Expense = {
    id: 0,
    isSelected: true,
    text: '',
  };

  brokerPostItem: BrokerPostItem = {
    notes: '',
    orderStatusId: 0,
    transportTypeId: 0,
    TransportNumber: '',
    expenses: [],
    fileDetails: [],
  };
  Documents: fileDetails = {
    documentTypeId: 0,
    uri: '',
    fileId: 0,
  };

  constructor(
      private http: HttpClient,
      private service: BrokerItemService,
      private route: ActivatedRoute,
      private router:Router
  ) { }
  //clone div
  public append() {
    this.files.push({ docTypeId: 10 });
  }
  Delete(index: number) {
    this.files.splice(index, 1);
  }

  updateOrder = new BrokerItem();
  ngOnInit(): void {
    this.route
      .queryParamMap
      .subscribe(params => {
        this.orderIdQueryParam = params.get('orderId') ?? undefined;
      });
    if (this.orderIdQueryParam != undefined) {
      this.service.updateBrokerItem1(this.orderIdQueryParam).subscribe(
        (res) => {
          this.orderStatus = res.orderStatus;
          this.brokerItemModel = res;
          this.brokerItemModel.documents = res.documents;
          this.brokerPostItem.notes = res.notes;
          this.transportTypes = res.transportTypes;
          this.documentTypes = res.documentTypes;
          this.notes = res.notes;
          this.expenses = res.expenses;
          this.Checkbox = res.expenses.filter(e => e.isSelected).map(e => e.id);
          this.files = res.documents.map(d => {return {
            docTypeId: d.documentTypeId,
            fileId: d.fileId,
            uri: d.uri
          };});
          for(const f of this.files) {
            f.uri = f.uri!.split('!@#$%^&').pop() ?? '';
          }
          this.transportNumber = res.transportNo;
          // this.id = res.id;
          // this.isSelected = res.isSelected;
          this.expenses = res.expenses;
          // this.documents = []
          // var documentItem: FileDetailItem = {
          //   docTypeId: this.documents.documentTypeId, //bura select den gelek xidmet verirsen
          //   fileId: Number(this.documents.fileId), //res.fileId (apiden gelen)
          // };
          // this.documents.push(documentItem);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.getItem();
    }
  }
  getItem() {
    this.service.getBrokerCreate().subscribe((res) => {


      this.brokerPostItem = res;
      this.transportTypes = res.transportTypes;
      this.documentTypes = res.documentTypes;
      this.brokerItemModel.totalCost=res.totalCost;
      this.notes = res.notes;
      this.Document.uri = res.FileDetail;
      this.documentTypes.forEach((res: any) => {
        this.docTypeId = res.documentTypeId;
      });
      this.expenses = res.expenses;
      this.documents = res.documents;
      this.brokerItemModel.documents = res.documents;

      this.transportNumber = res.transportNo;
      this.id = res.id;
      this.isSelected = res.isSelected;
      this.expenses = res.expenses;

    });
  }
  //fileupload

  selectDocTypeId(index: number, event: Event) {
    const target = event.target as HTMLInputElement;
    this.files[index].docTypeId = Number(target.value);
  }

  fileChange($event: any, index: number) {
    const selectedFile = <fileDetails>$event.target.files[0];
    const Fd: any = new FormData();

    Fd.append('files', selectedFile);
    this.http
      .post<any>('https://localhost:44323/api/File', Fd)
      .subscribe((res) => {
        this.files[index].uri = res.uri.split('!@#$%^&').pop()!;
        this.files[index].fileId = res.fileId;
      });

    this.brokerItemModel.documents = this.documents;

  }
  private toExpenseIdObJ(id: string): ExpenseId {
    return {
      id: Number(id),
    };
  }
  private toUploadIdObJ(fileId: string, docTypeId: string): fileDetail {
    return {
      fileId: Number(fileId),
      docTypeId: Number(docTypeId),
    };
  }

  private isValid(e: any) {
    if (typeof e == 'string') { e = e.trim(); }
    switch (e) {
    case '':
    case 0:
    case -1:
    case '0':
    case null:
    case false:
    case 'false':
    case undefined:
    case typeof e == 'undefined':
      return false;
    default:
      return true;
    }
  }


  onSaveOrApprove(data: BrokerItem, status: number) {
    //testiq:5, yaddas saxla 4
    data.expenses = this.Checkbox.map(this.toExpenseIdObJ);

    // this.brokerPostItem.fileDetails = this.documents;
    this.brokerPostItem.fileDetails = this.files.map(f => {
      return {
        docTypeId: f.docTypeId!,
        fileId: f.fileId!
      };
    });
    this.brokerPostItem.expenses = this.expenses.filter(e => e.isSelected);
    this.brokerPostItem.orderStatusId = status;
    this.brokerPostItem.transportTypeId = Number(
      this.brokerItemModel.transportTypeId
    );
    this.brokerPostItem.TransportNumber = this.brokerItemModel.transportNo;
    this.brokerPostItem.fileDetails = this.files.map(f => {return {
      docTypeId: f.docTypeId!,
      fileId: f.fileId!
    };});

    if(this.files === undefined ||
            this.files.some(f =>
              f.docTypeId === undefined || f.fileId === undefined
                || f.uri === undefined)) {
      errorAlert('En azi bir fayl yükləyin!', 'Uğursuz');
      return;
    }

    if (this.orderIdQueryParam != undefined) {
      this.PutSaveOrApprove();
    }
    else {
      this.PostSaveOrApprove();

    }
  }
  private PostSaveOrApprove() {
    if (!this.isValid(this.brokerPostItem.TransportNumber)) {
      Swal.fire(
        'Error!',
        'NvNo bosdu!',
        'error'
      );
    }

    this.service
      .postBrokerItemSave(this.brokerPostItem)
      .subscribe({
        next: (response: any) => {
          Swal.fire(
            'Uğurlu',
            'Yeni broker yaradildi',
            'success'
          );
          if(response){
            this.router.navigate(['//broker']);
          }
        },
        error: error => {
          console.error(error);

          const errMsg = error.error.error;
          switch (error.status) {
          case 400:
            Swal.fire(
              'Error!',
              errMsg,
              'error'
            );
            break;
          case 500:
            Swal.fire(
              'Error!',
              'Server problemi',
              'error'
            );
            break;
          default:
            Swal.fire(
              'ERROR',
              'ERROR',
              'error'
            );

          }
        }
      });
  }
  private PutSaveOrApprove() {
    if (!this.isValid(this.brokerPostItem.TransportNumber)) {
      Swal.fire(
        'Error!',
        'NvNo bosdu!',
        'error'
      );

    }
    else {
      this.service
        .updateBrokerSave(this.orderIdQueryParam, this.brokerPostItem)
        .subscribe((res) => {

          Swal.fire(
            'Uğurlu',
            'Broker güncəlləndi',
            'success'
          );
          if(res){
            this.router.navigate(['//broker']);
          }
        }, error => {
          console.error(error);

          const errMsg = error.error.error;
          switch (error.status) {
          case 400:
            Swal.fire(
              'Error!',
              errMsg,
              'error'
            );
            break;
          case 500:
            Swal.fire(
              'Error!',
              'Server problemi',
              'error'
            );
            break;
          default:
            Swal.fire(
              'ERROR',
              'ERROR',
              'error'
            );

          }
        });
    }

  }

  onChangeInput(expense: any, event: Event) {
    const target = event.target as HTMLInputElement;
    expense.isSelected = target.checked;
  }
}
interface ExpenseId {
  id: number;
}
interface fileDetail {
  fileId: number;
  docTypeId: number;
}
