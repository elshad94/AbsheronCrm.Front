import { last } from 'rxjs';
import { BrokerItem } from './../../model/broker-item';
import { BrokerItemService } from './../../services/broker-item.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    item:any;


    constructor(
    private Brokerservice: BrokerItemService,
    private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getBroker();
        this.route.paramMap.subscribe((params) => {
            this.id = params.get('id');
        });
    // console.log(this.id)
    }

    getBroker() {
        console.log('rgherugutrhg');
        this.Brokerservice.getBrokerItem().subscribe((res) => {
            this.broker = res;
            console.log(res);
        });
    }
    putBroker() {
        this.Brokerservice.updateBrokerItem1(this.id).subscribe((res) => {
            console.log(res);
        });
    }
    onChangeList($event: any) {
        this.id = $event.target.value;
        this.isChecked = $event.target.checked;

        // this.broker=this.broker.map((d)=>{
        // if(d.orderId===this.id){
        //   d.select=this.isChecked
        //   return d;
        // }

        // return d;
        if (this.isChecked == true) {
            this.BrokerChecked.push(this.id);
            this.BrokerLength++;
            if (this.BrokerLength > 1) {
                this.BrokerChecked.shift();
            }
        } else {
            this.BrokerChecked.splice(this.BrokerChecked.indexOf(this.id), 1);
            this.BrokerLength--;
            // this.BrokerChecked.shift()
        }
        console.log(this.BrokerChecked);
    // console.log(this.broker);
    // this.broker.forEach((item) => {
    //   console.log(item);
    //   this.item = item;
    //   console.log(item.orderId)
    // });
    }

    deleteBrokerItem() {
        console.log(this.BrokerChecked.lenght);
        // for (let i = 0; i < this.BrokerLength; i++) {
        //   console.log('ss', this.BrokerChecked[i]);
        //   this.Brokerservice.deleteBrokerItem1(this.BrokerChecked[i]).subscribe(
        //     (res) => {
        //       console.log(res);
        //       this.getBroker();
        //     }
        //   );
        // }
        this.Brokerservice.deleteBrokerItem1(this.BrokerChecked).subscribe(
            (res) => {
                console.log(res);
                this.getBroker();
            }
        );

        // debugger

        //  this.BrokerChecked.forEach(element => {
        //  console.log(element)

    // });
    // alert('deletdir')
    }
}
