import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TITLE } from 'src/utils/contants';

@Component({
  selector: 'app-errorPage',
  templateUrl: './errorPage.component.html',
  styleUrls: ['./errorPage.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(`404${TITLE}`);
  }

}
