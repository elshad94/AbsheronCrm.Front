import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {
  getAuthAPiURI() {
    return 'http://localhost:92/redirect/reg';
  }

  getCrmAPIURI() {
    return 'http://localhost:92/redirect/crm';
  }
}
