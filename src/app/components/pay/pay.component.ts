import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PayModalComponent } from './pay-modal/pay-modal.component';


@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(private dialogRef:MatDialog) { }

  openDialog(){
    this.dialogRef.open(PayModalComponent,{
      height: '100px',
      width: '600px'
    })
  }

  ngOnInit(): void {
  }
  
}

