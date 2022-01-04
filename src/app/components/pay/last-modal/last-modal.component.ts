import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PayModalComponent } from '../pay-modal/pay-modal.component';

@Component({
  selector: 'app-last-modal',
  templateUrl: './last-modal.component.html',
  styleUrls: ['./last-modal.component.scss']
})
export class LastModalComponent implements OnInit {

  constructor(private dialogRef:MatDialog) { }

  openDialogNext(){
    this.dialogRef.closeAll();
    this.dialogRef.open(PayModalComponent,{
      height: '100px',
      width: '600px'
    })
  }

  ngOnInit(): void {
  }

}
