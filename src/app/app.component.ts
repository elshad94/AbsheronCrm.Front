import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import logger from 'src/utils/logger';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AbsLog';
  tk = false;

  constructor(
    private globalService: GlobalService){
  }

  ngOnInit(){
    this.globalService.tokenValue.subscribe(token => {
      this.tk = token.length > 0
      // if(this.tk) {
      //   $('body').css('overflow-x', 'visible')
      //   $('body').css('overflow-y', 'visible')
      // }
    })
  }
}

