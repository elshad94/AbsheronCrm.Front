import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-errorOperation',
  templateUrl: './errorOperation.component.html',
  styleUrls: ['./errorOperation.component.scss']
})
export class ErrorOperationComponent implements OnInit {

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        const reference = params['reference'];
        this.paymentService
          .confirmAddBalance(reference, true).subscribe();
      });
  }

  redirectToBalance() {
    window.location.href = '/balance';
  }

}
