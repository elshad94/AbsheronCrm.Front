import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { errorAlert } from 'src/utils/alerts';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {
  private ip = '';

  // NOTE: if you want to run this with local backend, comment the constructor and 2 get method return statements.
  // Then, uncomment the localhost lines in the getters ( check launchsettings.json in your apis for the port numbers  )
  // Also, if you want to run the front-end locally but use the server apis just comment out all of the code in constructor except the last line.
  constructor(private http: HttpClient, private router: Router,) {

    this.ip = 'cb.absheronport.az';
  }
  getAuthAPiURI() {
    //return `http://${this.ip}/redirect/reg/api`;
     return 'https://localhost:44383/api';
  }
  getCrmAPIURI() {
   // return `http://${this.ip}/redirect/crm/api`;
    return 'https://localhost:44393/api';
  }
}
