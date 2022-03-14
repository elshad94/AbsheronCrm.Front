import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-succesOperation',
  templateUrl: './succesOperation.component.html',
  styleUrls: ['./succesOperation.component.scss']
})
export class SuccesOperationComponent implements OnInit {

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.confirmAddBalance();
  }

}
