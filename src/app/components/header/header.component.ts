import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public tk?:any;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {


    this.collapse()

  }

  signOut(){
    this.authService.logout().subscribe(res =>{
      localStorage.removeItem("token");
      var arrayFromStroage  = JSON.parse(localStorage.getItem("token") ?? "");
      this.tk = arrayFromStroage.length;
      localStorage.removeItem("Userid");
      localStorage.removeItem("Username");
      this.router.navigate([""])
    })
  }

  collapse() {
    $('#collapse').click(function () {
      $("div.head").toggleClass("fullHead")
      $("div.asideMain").toggleClass("asideCol")
      $("#collapse").toggleClass("tio-last-page")
      $(".logo").toggleClass("brandLogoCol")
      $(".pointer-event").toggleClass("pointer-eventCol")
    })
  }

}
