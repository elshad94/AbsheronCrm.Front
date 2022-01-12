import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlsService {
  getAuthAPiURI() {
    return 'https://localhost:44383/api';
  }

  getCrmAPIURI() {
    return 'https://localhost:44323/api';
  }
}
