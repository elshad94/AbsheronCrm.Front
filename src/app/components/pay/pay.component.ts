import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Payments } from 'src/app/model/payments';
import { PaymentService } from 'src/app/services/payment.service';
import { PayModalComponent } from './pay-modal/pay-modal.component';
import Swal from 'sweetalert2';
import { successAlert } from 'src/utils/alerts';



@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  constructor(private dialogRef: MatDialog,
    private payService: PaymentService) { }

  payments: Payments[] = [];
  columnsToDisplay = ['orderTypeText', 'orderNo', 'amount', 'orderId'];
  dataSource: MatTableDataSource<Payments> = new MatTableDataSource<Payments>(this.payments);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openDialog(orderId: number, orderNo: string) {
    Swal.fire({
      customClass:{
        title: 'test'
      },
      title: `<h2 style='font-family: "Lexend Deca", sans-serif !important; margin: 0;'>${orderNo} nömrəli sifariş üçün ödəmə üsulu seçin.</h2>`,
      html: `<div>
      <div>
        <select class="custom-select">
          <option disabled selected>Ödəmə üsulu</option>
          <option value="1">Avansdan</option>
          <option value="2">Bank</option>
          <option value="3">Kartla</option>
        </select>
      </div>
    </div>`,
      showCancelButton: false,
      confirmButtonColor: '#4299BF',
      confirmButtonText: 'Növbəti',
      cancelButtonText: 'Çıx',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          html: `<div class="all-modal p-5">
          <div class="modal-image d-flex justify-content-center">
            <img src="../../../../assets/icon/Group 648.png" alt="" />
          </div>
          <p class="text-center p-3">
            Bu halda ödəniş ”Absheron Logistika” tərəfdən təsdiqlənir.
          </p>
        </div>`,
          showCancelButton: true,
          confirmButtonColor: '#4299BF',
          confirmButtonText: 'Növbəti',
          cancelButtonText: 'Çıx',

        });
      }
    });
  }

  ngOnInit(): void {
    this.payService.payAll().subscribe((data: Payments[]) => {
      this.dataSource = new MatTableDataSource<Payments>(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}

