import { Component, OnInit , Input} from '@angular/core';
import AsanLoginRequestData from 'src/app/model/asanLoginRequsetData';
import CertificateResult from 'src/app/model/certificateResult';
import { AuthService } from 'src/app/services/auth.service';
import { PassDataService } from 'src/app/services/passData.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  certificateData: any = [];

  constructor(private authService: AuthService,
    private readonly passDataService: PassDataService
  ) { }

  ngOnInit() {
    var data = this.passDataService.data;
    this.authService.asanCertificate(data).subscribe({
      next: (result: CertificateResult) =>{
        this.certificateData = result;
      },
      error: () =>{

      }
      
    })
  }

}
