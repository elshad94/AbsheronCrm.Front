import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-errorOperation',
  templateUrl: './errorOperation.component.html',
  styleUrls: ['./errorOperation.component.scss']
})
export class ErrorOperationComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.confirmAddBalance(true);
  }

}
