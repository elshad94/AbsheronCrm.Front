import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { errorAlert } from 'src/utils/alerts';

@Component({
  selector: 'app-addBalance',
  templateUrl: './addBalance.component.html',
  styleUrls: ['./addBalance.component.scss']
})
export class AddBalanceComponent implements OnInit {
  operationType: number = -1;

  constructor(
    private payService: PaymentService,
    private router: Router,
    ) { }

  changeOperationType(event: Event) {
    const target = event.target as HTMLInputElement;
    this.operationType = Number(target.value);
  }

  ngOnInit() {
  }

  submit() {
    const amount = Number($('#amount').val());
    this.payService.addBalance({
      amount: amount,
      isBrokerBalance: this.operationType === 0
    }).subscribe({
      next: res => {
        this.payService.blogId = res.blogId;
        document.location.href = res.url;
      },
      error: () => errorAlert("Server Problemi")
    });
  }

}
