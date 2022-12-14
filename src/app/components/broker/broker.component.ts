import { MatDialog } from '@angular/material/dialog';
import { BrokerRequestItem } from './../../model/broker-request.model';
import { BrokerItem } from './../../model/broker-item';
import { BrokerItemService } from './../../services/broker-item.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Title} from "@angular/platform-browser";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.js';

import 'sweetalert2/src/sweetalert2.scss';
import logger from 'src/utils/logger';
import { TITLE } from 'src/utils/contants';
import { AccountService } from 'src/app/services/account.service';



enum CheckBoxType {
  APPLY_FOR_JOB,
  MODIFY_A_JOB,
  NONE,
}

@Component({
  selector: 'app-broker',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss'],
})
export class BrokerComponent implements OnInit {
  id: any;
  isChecked: any;
  Temp: any;
  orderStatusId: any;
  BrokerLength: any = 0;
  BrokerChecked: any = [];
  broker: BrokerItem[] = [];
  last: any;
  Broker = {};
  BrokerStatusTexts: string[] = [];
  item:any;
  BrokerItem:BrokerItem[]=[];
  BrokerItems!:BrokerItem;
  columnsToDisplay = ['docNo','customer','date','gbNo','amount','orderStatusText',
  'paymentMethod', 'paymentStatus', 'delete'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    dataSource = new MatTableDataSource<BrokerItem>(this.BrokerItem);

    constructor(
    private Brokerservice: BrokerItemService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private titleService: Title,
    ) {}

    ngOnInit(): void {
      this.getBroker();
      this.titleService.setTitle(`Broker${TITLE}`);
    }



    getBroker() {
      this.Brokerservice.getBrokerItem().subscribe((res) => {
        this.BrokerStatusTexts = [...new Set(res.map(res => res.orderStatusText ))];
        res.map(res => {
          this.id=res.orderId;
        });
        this.dataSource = new MatTableDataSource<BrokerItem>(res);
        this.dataSource.paginator = this.paginator;
      });
    }

    openDialog(item: BrokerItem, itemNo: string){
      Swal.fire({
        title: `Sifari?? No ${itemNo} silinsin?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'B??li',
        cancelButtonText: 'Xeyr'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteBrokerItem(item, itemNo);
        }
      });
    }

    onChangeList($event: any) {
      this.id = $event.target.value;
      this.isChecked = $event.target.checked;

      if (this.isChecked == true) {
        this.BrokerChecked.push(this.id);
        this.BrokerLength++;
        if (this.BrokerLength > 1) {
          this.BrokerChecked.shift();
        }
      } else {
        this.BrokerChecked.splice(this.BrokerChecked.indexOf(this.id), 1);
        this.BrokerLength--;
      }
    }




    deleteBrokerItem(id:any, orderNo: string) {

      this.Brokerservice.deleteBrokerItem1(id).subscribe(

        (res:any) => {
          Swal.fire(
            'Silindi!',
            `Sifari?? No ${orderNo} silindi`,
            'success'
          );
          this.getBroker();
        },
        (error: any) => {
          const status = error.status;
          switch(status) {
          case 404:
            Swal.fire(
              'Error!',
              `Order No ${orderNo} art??q silinib!`,
              'error'
            );
            break;
          case 400: case 500:
            Swal.fire(
              'Error!',
              'Server problemi',
              'error'
            );
            break;
          }
        }
      );
    }

    filterTableByStatus(event: Event) {
      const elem = event.target as HTMLInputElement;
      const status = elem.value;
      this.dataSource.filterPredicate = (data: BrokerItem, filter: string) =>
        data.orderStatusText.trim().toLowerCase() === filter;
      this.dataSource.filter = status.trim().toLowerCase();
    }
}
