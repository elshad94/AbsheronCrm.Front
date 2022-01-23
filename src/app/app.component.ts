import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import logger from 'src/utils/logger';
import { GlobalService } from './services/global.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AbsLog';
  tk = false;

  constructor(
    private globalService: GlobalService,
    private ref: ChangeDetectorRef){
  }

  ngOnInit(){
    this.globalService.tokenValue.subscribe(token => {
      this.tk = token.length > 0
      this.ref.markForCheck()
      if(this.tk) {
        $('body').css('overflow-x', 'visible !important')
        $('body').css('overflow-y', 'visible !important')
        Object.assign(
          document.getElementsByTagName('body'),
          {
            overflowY: 'visible !important',
            /* Hide vertical scrollbar */
            overflowX: 'visible !important',
          }
        )
      }
    })
  }
}

