import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorAlert } from 'src/utils/alerts';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {
  private ip = '';

  constructor(private http: HttpClient, private router: Router,) {
    this.ip = '172.25.60.53';
    let url = this.getAuthAPiURI();
    this.http.get(`${url}/ping`).subscribe({
      next: () => {return;},
      error: () => {
        this.ip = '85.132.108.234';
        url = this.getAuthAPiURI();
        this.http.get(`${url}/ping`).subscribe({
          next: () => {return;},
          error: () => {
            errorAlert('Server Problemi!')
              .then(() => this.router.navigate(['']));
          }
        });
      }
    });
  }

  getAuthAPiURI() {
    return `http://${this.ip}:92/redirect/reg/api`;
  }

  getCrmAPIURI() {
    return `http://${this.ip}:92/redirect/crm/api`;
  }


}
