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
    // const browserUri = window.location.href;
    // if(browserUri.includes('172.25.60.53')) {
    //   this.ip = '172.25.60.53';
    // } else if(browserUri.includes('85.132.108.234')) {
    //   this.ip = '85.132.108.234';
    // } else {
    //   errorAlert('Server Problemi!')
    //     .then(() => this.router.navigate(['']));
    // }
    this.ip = '85.132.108.234';
  }

  getAuthAPiURI() {
    return `http://${this.ip}:92/redirect/reg/api`;
  }

  getCrmAPIURI() {
    return `http://${this.ip}:92/redirect/crm/api`;
  }


}
