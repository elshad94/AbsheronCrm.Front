import { Component, OnInit, Input } from '@angular/core';
import AsanLoginRequestData from 'src/app/model/asanLoginRequsetData';
import CertificateResult from 'src/app/model/certificateResult';
import { AuthService } from 'src/app/services/auth.service';
import { PassDataService } from 'src/app/services/passData.service';
import { Title } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  certificateLoginResult: any = [];

  certificateData: any = []


  data = {
    phone: '',
    userId: ''
  }

  postData = {
    phone: '',
    userId: '',
    key: '',
    cert: ''
  };


  selectedItemKey!: string;
  selectedItemCertificate!: string;
  transacId?: string;
  verifyCode?: string;
  intervalReg?: number = 5000;
  testsubscription!: Subscription;

  status?: any = {
    status: ''
  };



  constructor(private authService: AuthService,
    private readonly passDataService: PassDataService,
    private titleService: Title,
  ) { }


  ngOnInit() {
    this.titleService.setTitle("Serifikatlar | Abşeron Logistika Mərkəzi");

    this.data = this.passDataService.data;
    this.authService.asanCertificate(this.data).subscribe({
      next: (result: CertificateResult) =>{

        this.certificateData = result

        console.log(this.certificateData)
      },
      error: () =>{

      }

    })
  }

  setSelectedItemDetails(key: string, cert: string) {
    this.selectedItemCertificate = cert;
    this.selectedItemKey = key;
  }

  templateForm() {
    const setInterval = interval(this.intervalReg)

    this.postData = {
      phone: this.data.phone,
      userId: this.data.userId,
      key: this.selectedItemKey,
      cert: this.selectedItemCertificate
    }

    this.authService.certifcateLogin(this.postData).subscribe({
      next: (result: any) =>{

        this.certificateLoginResult = result

        this.transacId = result.transactionId
        this.verifyCode = result.verificationCode

        if (this.transacId == '0') {
          Swal.fire({
            icon: 'error',
            title: 'Xəta...',
            text: 'Nəsə xəta baş verdi!',
            confirmButtonText: 'Bağla'
          })
          this.testsubscription.unsubscribe()
          return;
        }
        Swal.fire({
          imageUrl: '../../../assets/img/loading.gif',
          showCloseButton: true,
          showConfirmButton: false,
          width: '370px',
          imageWidth: '40%',
          title: 'Xahiş edirik telefonunuzu yoxlayın.',
          html: `Yoxlama kodu: ${this.verifyCode}`,
          allowOutsideClick: false
        })

        console.log(this.certificateLoginResult)
      },
      error: () =>{

      }

    })

    this.testsubscription = setInterval.subscribe((res: any) =>{

      this.authService.certifcateStatusCheck(this.certificateLoginResult).subscribe({
        next: (result: any) =>{
          this.status = result
          console.log(this.status.status)
          if (this.status.status == 'SIGNATURE_CREATED') {
            this.testsubscription.unsubscribe()
            Swal.close();
          }
        },
        error: () =>{
  
        }
      })

    })
  }

}
