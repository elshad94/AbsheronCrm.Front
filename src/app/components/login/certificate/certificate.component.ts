import { Component, OnInit, Input } from '@angular/core';
import AsanLoginRequestData from 'src/app/model/asanLoginRequsetData';
import CertificateResult from 'src/app/model/certificateResult';
import { AuthService } from 'src/app/services/auth.service';
import { PassDataService } from 'src/app/services/passData.service';
import { Title } from '@angular/platform-browser';
import { interval, Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { GlobalService } from 'src/app/services/global.service';
import { Router } from '@angular/router';
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
  selectedItemVoen!: string;
  organizationCode: any = {
    voen: ''
  };
  testsubscription!: Subscription;

  status?: any = {
    status: ''
  };

  constructor(private authService: AuthService,
    private readonly passDataService: PassDataService,
    private titleService: Title,
    private globalService: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.titleService.setTitle("Serifikatlar | Abşeron Logistika Mərkəzi");

    this.data = this.passDataService.data;
    this.authService.asanCertificate(this.data).subscribe({
      next: (result: CertificateResult) => {

        this.certificateData = result
        console.log(this.certificateData)
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Xəta',
          text: 'Serverdə xəta baş verdi!',
        })
      }

    })

    console.log(this.selectedItemVoen)
  }

  setSelectedItemDetails(organizationCode: string) {
    this.selectedItemVoen = organizationCode;
  }

  getDecodedAccessToken(token?: any): any {
    try {
      return jwt_decode(token?.toString());
    }
    catch (Error) {
      return null;
    }
  }

  templateForm() {
    this.organizationCode = {
      voen: this.selectedItemVoen
    }

    this.authService.checkvoen(this.organizationCode).subscribe({
      next: (result: any) =>{
        console.log(result.status)
        if (result.status == true) {
          this.globalService.token = result.data;
          console.log(result.data)
          localStorage.setItem('Userid', this.getDecodedAccessToken(result.data.toString()).UserId);
          localStorage.setItem('Username', this.getDecodedAccessToken(result.data.toString()).Username);
          this.router.navigate(['/home']);
        }
        if (result.status == false) {
          Swal.fire({
            icon: 'info',
            title: 'Məlumat',
            text: `${this.organizationCode.voen} nömrəli Vöenə bağlı hesab yoxdur. Zəhmət olmasa qeydiyyatdan keçin`,
            confirmButtonText: 'Bağla'
          })
          this.router.navigate(['/register']);
        }
        console.log(this.organizationCode)
      },
      error: () =>{
        Swal.fire({
          icon: 'error',
          title: 'Xəta',
          text: 'Serverdə xəta baş verdi!',
        })
      }
    })
  }

}
