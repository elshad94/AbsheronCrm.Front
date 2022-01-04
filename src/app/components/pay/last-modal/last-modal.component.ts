import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Payments } from 'src/app/model/payments';
import { PayModalComponent } from '../pay-modal/pay-modal.component';

@Component({
  selector: 'app-last-modal',
  templateUrl: './last-modal.component.html',
  styleUrls: ['./last-modal.component.scss']
})
export class LastModalComponent implements OnInit {

  constructor(private dialogRef:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Payments) {
   }

  ngOnInit(): void {
  }

}
