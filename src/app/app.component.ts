import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import logger from 'src/utils/logger';
import { GlobalService } from './services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AbsLog';
  tk = false;
  uri!: string;

  constructor(
    private globalService: GlobalService,
    private route: Router) {
  }

  ngOnInit() {
    this.globalService.tokenValue.subscribe(token => {
      this.tk = token.length > 0
    })
  }



}

