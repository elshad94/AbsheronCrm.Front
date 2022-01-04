import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import HelpRequestBody from 'src/app/model/HelpRequestBody';
import { HelpService } from 'src/app/services/help.service';
import { errorAlert, successAlert } from 'src/utils/alerts';
import logger from 'src/utils/logger';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss']
})
export class HelpComponent {
    email: HelpRequestBody = {
        emailSubject: '',
        emailText: '',
        emailType: ''
    };

    constructor(
      private helpService: HelpService,
      private router: Router
    ) { }

    sendEmail() {
        if(this.email.emailSubject.trim().length === 0) {
            errorAlert('Mövzunu daxil edin', 'Uğursuz');
            return;
        }
        if(this.email.emailText.trim().length === 0) {
            errorAlert('Sualınızı daxil edin', 'Uğursuz');
            return;
        }
        if(this.email.emailType.trim().length === 0) {
            errorAlert('Sual növünü daxil edin', 'Uğursuz');
            return;
        }
        this.helpService.sendEmail(this.email).subscribe({
            next: () => {
                successAlert('Sualınız göndərildi', 'Uğurlu').then(res => {
                    if(res.isConfirmed) {
                        this.router.navigate(['/']);
                    }
                });
            },
            error: err => {
                errorAlert('Server problemi');
                logger.error(err);
            }
        });
    }
}
