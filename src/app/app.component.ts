import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, HostListener } from '@angular/core';
import { GlobalService } from './services/global.service';
import { Router } from '@angular/router';
import { PassDataService } from './services/passData.service';
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
    private route: Router,
    private passData: PassDataService) {
  }

  @HostListener('window:beforeunload')
  doSomething() {
    window.onbeforeunload = function (e) {
      window.onunload = function () {
        window.localStorage['isMySessionActive'] = "false";
      }
      return undefined;
    };

    window.onload = function () {
      window.localStorage['isMySessionActive'] = "true";
    };
    // localStorage.removeItem('token');
  }


  ngOnInit() {
    this.globalService.tokenValue.subscribe((token: any) => {
      this.tk = token.length > 0
      this.passData.token = this.tk
    })
  }




}

