import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { AccountService } from 'src/app/services/account.service';
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
  public tk?: any;
  brokerBalance!: number;
  terminalBalance!: number;

  compName!: string;
  logger: any;

  constructor(private authService: AuthService,
    private router: Router,
    private globalService: GlobalService,
    private paymentService: PaymentService,
    private getUser: AccountService) {
  }

  ngOnInit(): void {
    this.collapse();
    setTimeout(() => {
      this.getUserBalance();
      this.getCompName();
    }, 500);
  }

  getUserBalance() {
    this.globalService.tokenValue.subscribe(token => {
      this.tk = token.length > 0
    })
    if (!this.tk) {
      return
    }
    else {
      this.paymentService.getUserBalance()
        .subscribe((res: { brokerBalance: number; terminalBalance: number; }) => {
          this.brokerBalance = res.brokerBalance;
          this.terminalBalance = res.terminalBalance;
        })
    }

  }

  getCompName() {
    this.globalService.tokenValue.subscribe(token => {
      this.tk = token.length > 0
    })
    if (!this.tk) {
      return
    }
    else {
      this.getUser.getUser(Number(localStorage.getItem('Userid'))).subscribe(res => {
        this.compName = res.uCustname
      })
    }
  }

  signOut() {
    this.authService.logout().subscribe((res: any) => {
      this.globalService.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('Userid');
      localStorage.removeItem('Username');
      this.router.navigate(['']);
    }, (err: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Xəta',
        text: 'Serverdə hər hansı bir xəta baş verdi',
      });
    });
  }

  collapse() {
    if (window.innerWidth < 768) {
      $('#collapse').click(function () {
        $('div.head').toggleClass('resHead');
        $('div.asideMain').toggleClass('resAsideMenu');
        $('#collapse').toggleClass('tio-last-page');
        $('.subCat').addClass('subCatRes');
        $('.termBalanceRes').toggleClass('balanceResCol');
        $('.brokBalanceRes').toggleClass('balanceResCol');


      });
      $('main').click(function () {
        $('div.head').removeClass('resHead');
        $('div.asideMain').removeClass('resAsideMenu');
        $('#collapse').removeClass('tio-last-page');
        $('.termBalanceRes').addClass('balanceResCol');
        $('.brokBalanceRes').addClass('balanceResCol');


      })
      $('.resLi').click(function () {
        $('div.head').removeClass('resHead');
        $('div.asideMain').removeClass('resAsideMenu');
        $('#collapse').removeClass('tio-last-page');
        $('.subCat').removeClass('subCatRes');
        $('.termBalanceRes').addClass('balanceResCol');
        $('.brokBalanceRes').addClass('balanceResCol');
      })

    }
    else {
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
