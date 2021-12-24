import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NextModalComponent } from '../next-modal/next-modal.component';


@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.component.html',
  styleUrls: ['./pay-modal.component.scss']
})
export class PayModalComponent implements OnInit {

  constructor(private dialogRef:MatDialog) { }
  openDialogNext(){
    this.dialogRef.open(NextModalComponent,{
      height: '400px',
      width: '600px'
    })
  }
  ngOnInit(): void {
  }
 

}
