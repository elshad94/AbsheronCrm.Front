import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payments } from 'src/app/model/payments';
import { LastModalComponent } from '../last-modal/last-modal.component';
import { PayModalComponent } from '../pay-modal/pay-modal.component';


@Component({
  selector: 'app-next-modal',
  templateUrl: './next-modal.component.html',
  styleUrls: ['./next-modal.component.scss']
})
export class NextModalComponent implements OnInit {

  constructor(private dialogRef:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Payments) { }
  openDialogLast(){
    this.dialogRef.open(LastModalComponent,{
      height: '400px',
      width: '600px'
    })
  }

  openDialog(){
    this.dialogRef.closeAll()
    
    this.dialogRef.open(PayModalComponent,{
      height: '100px',
      width: '600px'
    })
  }

  ngOnInit(): void {
    alert(this.data.orderTypeId)
  }

}
