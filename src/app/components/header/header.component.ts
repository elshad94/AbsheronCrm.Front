import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public tk?:any;
  brokerBalance!: number;
  terminalBalance!: number;
  constructor(private authService: AuthService,
    private router: Router,
    private globalService: GlobalService,
    private paymentService: PaymentService) {
        // $('body').css('overflow-x', 'visible')
        // $('body').css('overflow-y', 'visible')
    }

  ngOnInit(): void {
    this.collapse();
    this.getUserBalance();
  }

  getUserBalance() {
    this.paymentService.getUserBalance()
      .subscribe(res => {
        this.brokerBalance = res.brokerBalance;
        this.terminalBalance = res.terminalBalance;
      })
  }

  signOut(){
    this.authService.logout().subscribe((res: any) =>{
      this.router.navigate(['']);
      this.globalService.token = '';
      localStorage.removeItem('token');
      const arrayFromStroage  = JSON.parse(localStorage.getItem('token') ?? '');
      this.tk = arrayFromStroage.length;
      this.router.navigate(['']);
      localStorage.removeItem('Userid');
      localStorage.removeItem('Username');
    },err =>{
      Swal.fire({
        icon: 'error',
        title:'Xəta',
        text: 'Serverdə hər hansı bir xəta baş verdi',
      });
    });
  }

  collapse() {
    if ( window.innerWidth < 768) {
      $('#collapse').click(function () {
        $('div.head').toggleClass('resHead');
        $('div.asideMain').toggleClass('resAsideMenu');
        $('#collapse').toggleClass('tio-last-page');
        $('.subCat').addClass('subCatRes');

      });
      $('main').click(function () {
        $('div.head').removeClass('resHead');
        $('div.asideMain').removeClass('resAsideMenu');
        $('#collapse').removeClass('tio-last-page');
      })
      $('.resLi').click(function () {
        $('div.head').removeClass('resHead');
        $('div.asideMain').removeClass('resAsideMenu');
        $('#collapse').removeClass('tio-last-page');
        $('.subCat').removeClass('subCatRes');
      })

   }
   else{
     $('#collapse').click(function () {
       $('div.head').toggleClass('fullHead');
       $('div.asideMain').toggleClass('asideCol');
       $('#collapse').toggleClass('tio-last-page');
       $('.logo').toggleClass('brandLogoCol');
       $('.pointer-event').toggleClass('pointer-eventCol');
     });
   }
  }

}
