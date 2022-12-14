import { FormGroup } from '@angular/forms';
import { Expense, fileDetails, TransportType, CustomBorderPoint, DestinationCustomPoint, BrPaymentTypes, BrCustomsBorderOffice, BrCustomsOffice } from './../../../model/broker-request.model';
import { DocumentType } from './../../../model/broker-request.model';
import { BrokerRequestItem } from 'src/app/model/broker-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BrokerItem } from './../../../model/broker-item';
import { BrokerItemService } from './../../../services/broker-item.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { errorAlert, successAlert } from '../../../../utils/alerts';
import { Title } from "@angular/platform-browser";

import 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';

import { BrokerPostItem, FileDetailItem, } from 'src/app/model/broker-post-item.model';
import logger from 'src/utils/logger';
import { TITLE } from 'src/utils/contants';
import isEditable from 'src/utils/isEditable';
import { FileService } from 'src/app/services/file.service';
import { getFileName } from 'src/utils/fileNameGetter';
import { ApiUrlsService } from 'src/app/services/api-urls.service';


interface FileDetails {
  fileId?: number,
  docTypeId?: number,
  uri?: string,
  name?: string
}

@Component({
  selector: 'app-broker-order', templateUrl: './broker-order.component.html', styleUrls: ['./broker-order.component.scss'],
})
export class BrokerOrderComponent implements OnInit {
  form!: FormGroup;
  id: any;
  isSelected: any;
  Checkbox: any = [];
  data!: BrokerItem;
  transportTypes: any = [];
  customBorderPoint:any=[];
  destinationCustomPoint:any=[];
  brPaymentTypes:any=[];
  brCustomsBorderOffice:any=[];
  brCustomsOffice:any=[];
  documentTypes: any = [];
  expenses: Expense[] = [];
  documents: any = [];
  transportNumber: any;
  freightAmount:any;
  pincode:any;
  brWarehouse:any;
  docTypeId: any;
  files: FileDetails[] = [{ docTypeId: 10 }];
  notes: any;
  scan: any = this.documents.uri;
  url: any;
  orderIdQueryParam?: string;
  orderStatus?: number;
  fileName?: string;
  test!: number;
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
  CustomBorderPoint: CustomBorderPoint = {
    id: 0,
    text: '',
  };
  BrPaymentTypes: BrPaymentTypes = {
    id: 0,
    text: '',
  };
  BrCustomsBorderOffice: BrCustomsBorderOffice = {
    id: 0,
    text: '',
  };
  BrCustomsOffice: BrCustomsOffice = {
    id: 0,
    text: '',
  };
  brokerItemModel: BrokerRequestItem = {
    expenses: [],
    transportNo: '',
    transportTypeId: -1,
    brPaymentTypeId:-1,
    brCustomsBorderOfficeId:-1,
    brCustomsOfficeId:-1,
    brFreightAmount:'',
    brPincode: '',
    brWarehouse: '',
    customPointId:-1,
    destinationId:-1,
    notes: '',
    documentTypes: [],
    documents: [],
    transportTypes: [],
    brPaymentTypes:[],
    brCustomsBorderOffice:[],
    brCustomsOffice:[],
    docNo: '',
    customerName: '',
    date: new Date(),
    totalCost: 0,

  };

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
    freightAmount:0,
    brPaymentTypeId:0,
    brCustomsBorderOfficeId:0,
    brCustomsOfficeId:0,
    TransportNumber: '',
    pincode:'',
    brWarehouse:'',
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
    private router: Router,
    private titleService: Title,
    private fileService: FileService,
    private apiUrlService: ApiUrlsService
  ) { }
  //clone div
  public append() {
    this.files.push({ docTypeId: 10 });
  }
  Delete(index: number) {
    this.files.splice(index, 1);
  }

  isEditable = () => isEditable(this.orderStatus);

  updateOrder = new BrokerItem();
  ngOnInit(): void {
    this.titleService.setTitle(`Broker${TITLE}`);
    this.route
      .queryParamMap
      .subscribe(params => {
        this.orderIdQueryParam = params.get('orderId') ?? undefined;
      });
    if (this.orderIdQueryParam != undefined) {
      this.service.updateBrokerItem1(this.orderIdQueryParam).subscribe(
        (res) => {
          console.log(res);
           debugger
          this.orderStatus = res.orderStatus;
          this.brokerItemModel = res;
          this.brokerItemModel.documents = res.documents;
          this.brokerItemModel.transportTypeId =res.transportTypeId;
          this.brokerPostItem.notes = res.notes;
          this.transportTypes = res.transportTypes;
          this.brPaymentTypes=res.brPaymentTypes;
          this.brCustomsBorderOffice=res.brCustomsBorderOffice;
          this.brCustomsOffice=res.brCustomsOffice;
          this.documentTypes = res.documentTypes;
          this.notes = res.notes;
          this.expenses = res.expenses;
          this.Checkbox = res.expenses.filter(e => e.isSelected).map(e => e.id);
          this.files = res.documents.map(d => {
            return {
              docTypeId: d.documentTypeId,
              fileId: d.fileId,
              uri: getFileName(d.uri),
              name: d.name,
            };
          });
          this.transportNumber = res.transportNo;
          this.freightAmount=res.brFreightAmount;
          this.pincode=res.brPincode;
          this.brWarehouse=res.brWarehouse;
          this.expenses = res.expenses;
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
      this.brPaymentTypes=res.brPaymentTypes;
      this.brCustomsBorderOffice=res.brCustomsBorderOffice;
      this.brCustomsOffice=res.brCustomsOffice;
      this.documentTypes = res.documentTypes;
      this.brokerItemModel.totalCost = res.totalCost;
      this.notes = res.notes;
      this.Document.uri = res.FileDetail;
      this.documentTypes.forEach((res: any) => {
        this.docTypeId = res.documentTypeId;
      });
      this.expenses = res.expenses;
      this.documents = res.documents;
      this.brokerItemModel.documents = res.documents;

      this.transportNumber = res.transportNo;
      this.freightAmount=res.freightAmount;
      this.pincode=res.pincode;
      this.brWarehouse=res.brWarehouse;
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

  fileChange($event: any, index: number, file: FileDetails) {
    const selectedFile = <fileDetails>$event.target.files[0];
    file.name = (selectedFile as any).name;
    const Fd: any = new FormData();
    this.test = index

    Fd.append('files', selectedFile);
    this.fileService.createFile(Fd.get('files'), true, false)
      .subscribe((res) => {
        this.files[index].uri = getFileName(res.uri);
        this.files[index].fileId = res.fileId;
      });

    this.brokerItemModel.documents = this.documents;

  }
  private toExpenseIdObJ(id: string): ExpenseId {
    return {
      id: Number(id),
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
  SavePdf(data:any){
    const blob = new Blob([data], {
      type: 'application/pdf'
    });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
  DownloadFile(fileId?:number){
    console.log(fileId);

   this.service.getFile(fileId).subscribe(res=>{
     this.SavePdf(res)
   })
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
    this.brokerPostItem.brPaymentTypeId=Number(
      this.brokerItemModel.brPaymentTypeId
    );
    this.brokerPostItem.brCustomsBorderOfficeId=Number(
      this.brokerItemModel.brCustomsBorderOfficeId
    );
    this.brokerPostItem.brCustomsOfficeId=Number(
      this.brokerItemModel.brCustomsOfficeId
    );
    this.brokerPostItem.TransportNumber = this.brokerItemModel.transportNo;
    this.brokerPostItem.freightAmount=this.brokerItemModel.brFreightAmount;
    this.brokerPostItem.brWarehouse=this.brokerItemModel.brWarehouse;
    this.brokerPostItem.pincode=this.brokerItemModel.brPincode;
    this.brokerPostItem.fileDetails = this.files.map(f => {
      return {
        docTypeId: f.docTypeId!,
        fileId: f.fileId!
      };
    });


    if (!this.isValid(this.brokerPostItem.TransportNumber)) {
      errorAlert('N/V No bo??dur')
      return
    }

    if (this.brokerPostItem.expenses.length === 0) {
      errorAlert('??n az?? bir xidm??t se??in')
      return
    }

    if (!this.isValid(this.brokerPostItem.transportTypeId)) {
      errorAlert('Sifrai?? n??v?? se??in')
      return
    }
    if (!this.isValid(this.brokerPostItem.brPaymentTypeId)) {
      errorAlert('??d??ni?? n??v??n?? se??in')
      return
    }
    if (!this.isValid(this.brokerPostItem.brCustomsBorderOfficeId)) {
      errorAlert('G??mr??k s??rh??d ke??id m??nt??q??sini se??in')
      return
    }
    if (!this.isValid(this.brokerPostItem.brCustomsOfficeId)) {
      errorAlert('T??yinat g??mr??k postunu se??in')
      return
    }
    if (!this.isValid(this.brokerPostItem.freightAmount)) {
      errorAlert('Y??k??n da????nma m??bl????i bo??dur')
      return
    }
     if (!this.isValid(this.brokerPostItem.pincode)) {
      errorAlert('PIN kod bo??dur')
      return
    }

    if (!this.isValid(this.brokerPostItem.brWarehouse)) {
      errorAlert('Anbar ??nvan?? bo??dur')
      return
    }
    if (this.files.some(file => !file.fileId)) {
      errorAlert('S??n??d fayl?? se??in')
      return
    }

    if (this.orderIdQueryParam != undefined) {
      this.PutSaveOrApprove();
    }
    else {
      this.PostSaveOrApprove();

    }
    console.log(this.brokerPostItem);

  }

  private PostSaveOrApprove() {
    this.service
      .postBrokerItemSave(this.brokerPostItem)
      .subscribe({
        next: (response: any) => {
          successAlert('Yeni broker yaradildi', 'U??urlu')
          if (response) {
            this.router.navigate(['//broker']);
          }
        },
        error: error => {
          console.error(error);

          const errMsg = error.error.error;
          switch (error.status) {
            case 400:
              errorAlert(errMsg, 'Error!')
              break;
            case 500:
              errorAlert('Server problemi', 'Error!')
              break;
            default:
              errorAlert('ERROR', 'ERROR')
          }
        }
      });
  }
  private PutSaveOrApprove() {

    this.service
      .updateBrokerSave(this.orderIdQueryParam, this.brokerPostItem)
      .subscribe((res) => {
        successAlert('Broker g??nc??ll??ndi', 'U??urlu')
        if (res) {
          this.router.navigate(['//broker']);
        }
      }, error => {
        console.error(error);

        const errMsg = error.error.error;
        switch (error.status) {
          case 400:
            errorAlert(errMsg, 'Error!')
            break;
          case 500:
            errorAlert('Server problemi', 'Error!')
            break;
          default:
            errorAlert('ERROR', 'ERROR')
        }
      });
  }

  onChangeInput(expense: any, event: Event) {
    const target = event.target as HTMLInputElement;
    expense.isSelected = target.checked;

  }
}
interface ExpenseId {
  id: number;
}
