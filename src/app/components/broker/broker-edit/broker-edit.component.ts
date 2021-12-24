import { BrokerRequestItem } from 'src/app/model/broker-request.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrokerItem } from './../../../model/broker-item';
import { BrokerItemService } from './../../../services/broker-item.service';
import { HttpClient } from '@angular/common/http'

import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-broker-edit',
  templateUrl: './broker-edit.component.html',
  styleUrls: ['./broker-edit.component.scss'],
})
export class BrokerEditComponent implements OnInit {
  id: any;
  isChecked: any;
  Checkbox: any = [];
  data!: BrokerItem;
  expenses:any=[];

  // checkboxLabel = [
  //   {
  //     id: '1 ',
  //     labelName: 'Qısa idaxal bəyannaməsinin yazılması',
  //     select: false,
  //   },
  //   { id: '2', labelName: 'Broker xidməti', select: false },
  //   { id: '3', labelName: 'İdxal bəyannaməsinin yazılması', select: false },
  //   { id: '4', labelName: 'Digər', select: false },
  // ];
  constructor(
    private http: HttpClient,
    private service: BrokerItemService,
    private router: ActivatedRoute
  ) {}
  updateOrder = new BrokerItem();
  transportTypes: any = [];
  documentTypes: any = [];
  brokerItemModel: BrokerRequestItem = {
    expenses:       [],
    transportNo:     '',
    transportTypeId:   0,
    notes:           '',
    documentTypes:   [],
    documents:      [],
    transportTypes:  [],
    docNo:           '',
    customerName:   '',
    date: '',
    totalCost:       0,
};
  expence1: boolean = false;
  expence2: boolean = false;
  expence3: boolean = false;
  expence4: boolean = false;

  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    this.service.updateBrokerItem1(this.id).subscribe((res) => {


      console.log(res);
      this.transportTypes = res.transportTypes;
      this.documentTypes = res.documentTypes;
      this.expenses=res.expenses;

      this.updateOrder.docNo = res.transportTypeId;
      this.updateOrder.transportNumber = res.transportNo;
       this.updateOrder.invoiceNotesLabel=res.notes;

      //set checkbox values

      for (var i = 0; i < res.expenses.length; i++) {
        let currentItem = res.expenses[i];

        switch (currentItem.id) {
          case 1:
            this.expence1 = Boolean(currentItem.isSelected);
            break;
          case 2:
            this.expence2 = Boolean(currentItem.isSelected);
            break;
          case 3:
            this.expence3 = Boolean(currentItem.isSelected);
            break;
          case 4:
            this.expence4 = Boolean(currentItem.isSelected);
            break;
        }
      }




      // console.log(expence1Data);
    });
    // this.putBroker()
  }

  onSubmitApproval(data: any) {
    this.service.postBrokerItem(data).subscribe((res) => {
      console.log(res);
    });
  }

  UpdateSave() {}
  onChangeInput(checkId: any, $event: any) {
    this.id = $event.target.value;
    this.isChecked = $event.target.checked;
    console.log(this.id, this.isChecked);

    if (this.isChecked == true) {
      this.Checkbox.push(this.id);
    } else {
      this.Checkbox.splice(this.Checkbox.indexOf(this.id), 1);
    }
    console.log(this.Checkbox);
  }
}
