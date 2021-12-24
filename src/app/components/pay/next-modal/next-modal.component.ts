import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LastModalComponent } from '../last-modal/last-modal.component';


@Component({
  selector: 'app-next-modal',
  templateUrl: './next-modal.component.html',
  styleUrls: ['./next-modal.component.scss']
})
export class NextModalComponent implements OnInit {

  constructor(private dialogRef:MatDialog) { }
  openDialogLast(){
    this.dialogRef.open(LastModalComponent,{
      height: '400px',
      width: '600px'
    })
  }

  ngOnInit(): void {
  }

}
