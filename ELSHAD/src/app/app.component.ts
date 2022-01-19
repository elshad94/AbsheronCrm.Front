import { Component, OnInit } from '@angular/core';
import logger from 'src/utils/logger';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AbsLog';
  public tk = false;

  constructor(){
    if(localStorage.getItem('token')=='' || localStorage.getItem('token')==null){
      this.tk =false;
    }else{
      this.tk=true;
    }
  }

  ngOnInit(){
    // var arrayFromStroage  = JSON.parse(localStorage.getItem("token") ?? "");
    // logger.info(arrayFromStroage.length)
    // if (arrayFromStroage.length > 0) {
    // this.tk = true;
    // }
    // this.globalSrv.tokenLengthValue.subscribe((tokenLength) => {
    //     logger.info(tokenLength)
    //     this.tk = tokenLength > 0
    //  })

  }
}
