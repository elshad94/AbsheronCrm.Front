import { Expense } from './../../../model/broker-request.model';
import { DocumentType } from './../../../model/broker-request.model';
import { Document } from './../../../model/broker-request.model';
import { TransportType } from './../../../model/broker-request.model';
import { BrokerRequestItem } from 'src/app/model/broker-request.model';
import { ActivatedRoute } from '@angular/router';
import { BrokerItem } from './../../../model/broker-item';
import { BrokerItemService } from './../../../services/broker-item.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
@Component({
  selector: 'app-broker-order',
  templateUrl: './broker-order.component.html',
  styleUrls: ['./broker-order.component.scss'],
})
export class BrokerOrderComponent implements OnInit {
  id: any;
  isSelected: any;
  Checkbox: any = [];
  data!: BrokerItem;
  transportTypes: any = [];
  documentTypes: any = [];
  expenses: any = [];
  documents: any = [];

  DocumentType:DocumentType={
    documentTypeId:0,
    name: '',
  }

  Expense: Expense = {
    id:         0,
    isSelected:true ,
    text:       '',
  };

  Document:Document={
    documentTypeId: 0,
    uri:            '',
    fileId:         0,
  }
  TransportType:TransportType={
    id:   0,
    text: '' ,
  }
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
  /// filetypesdetailseis gondermirsen


  // checkboxLabel = [
  //   { id: '1 ',
  //     labelName: 'Qısa idaxal bəyannaməsinin yazılması',
  //     select: false,},
  //   { id: '2', labelName: 'Broker xidməti', select: false },
  //   { id: '3', labelName: 'İdxal bəyannaməsinin yazılması', select: false },
  //   { id: '4', labelName: 'Digər', select: false },
  // ];
  constructor(
    private http: HttpClient,
    private service: BrokerItemService,
    private route: ActivatedRoute
  ) {}
  updateOrder = new BrokerItem();
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.getItem();
  }
  getItem() {
    console.log();

    this.service.getBrokerCreate().subscribe((res) => {
      console.log(res);
      this.transportTypes = res.transportTypes;
      this.documentTypes = res.documentTypes;
      this.expenses = res.expenses;
      this.documents = res.documents;
      this.id=res.id;
      this.isSelected = res.isSelected;
       this.expenses = res.expenses;
      console.log(res.expenses);
    });
  }
  CreateFile(){
    this.service.postBrokerCreateFile().subscribe(res=>{
      console.log(res)
    })
  }
  onSubmitApproval(data: BrokerRequestItem) {
    console.log(data);
    this.service.postBrokerItem(data).subscribe((res) => {
      console.log(res);
    });
  }
  onSubmitSave(data: BrokerRequestItem) {
    console.log(data);

    this.service.postBrokerItemSave(data).subscribe((res) => {
      console.log(res);
    });
  }
  onChangeInput(id:any,$event: any) {
    this.id=$event.target.value;
    this.isSelected = $event.target.checked;

    console.log(this.id, this.isSelected);

    if (this.isSelected == true) {
      this.Checkbox.push(this.id);
    } else {
      this.Checkbox.splice(this.Checkbox.indexOf(this.id), 1);
    }
    console.log(this.Checkbox);
  }
}
