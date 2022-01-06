import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#collapse').click(function () {
      $( "div.head" ).toggleClass( "fullHead" )
      $( "div.asideMain" ).toggleClass( "asideCol")
      $( "#collapse" ).toggleClass( "tio-last-page")
      $( ".logo" ).toggleClass( "brandLogoCol")
      $( ".pointer-event" ).toggleClass( "pointer-eventCol")
    })

    $('#term').click(function() {
      $( ".term" ).toggleClass("termcol")
    })
  }

}
