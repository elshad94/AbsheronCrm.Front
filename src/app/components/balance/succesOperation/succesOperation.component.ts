import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-succesOperation',
  templateUrl: './succesOperation.component.html',
  styleUrls: ['./succesOperation.component.scss']
})
export class SuccesOperationComponent implements OnInit {

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        const reference = params['reference'];
        this.paymentService
          .confirmAddBalance(reference).subscribe();
      });
  }

  redirectToBalance() {
    window.location.href = '/balance';
  }
}
