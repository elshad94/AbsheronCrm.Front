import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NextModalComponent } from '../next-modal/next-modal.component';

@Component({
  selector: 'app-last-modal',
  templateUrl: './last-modal.component.html',
  styleUrls: ['./last-modal.component.scss']
})
export class LastModalComponent implements OnInit {

  constructor(private dialogRef:MatDialog) { }

  openDialogNext(){
    this.dialogRef.closeAll();
    this.dialogRef.open(NextModalComponent,{
      height: '400px',
      width: '600px'
    })
  }

  ngOnInit(): void {
  }

}
