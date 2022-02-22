import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ErrorResponse from '../model/ErrorResponse';
import FileCreationResponse from '../model/FileCreationTerminalResponse';
import { PayBankFile } from '../model/payBankFile';
import { ApiUrlsService } from './api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }

  // createUserFile(file: File, cusType: number) {
  //   const formData = new FormData();
  //   formData.append('files', file);
  //   const headers = new HttpHeaders({
  //     'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
  //     'Access-Control-Allow-Origin': '*'
  //   });
  //   return this.http
  //     .post<FileCreationResponse>(
  //       `${this.baseUrl}/File/CreateUserFile?cusType=${cusType}`, formData, {headers}
  //     );
  // }

  createFile(file: File, isBrokerOrder: boolean, isPayment: boolean, nvNo?: string) {
    const formData = new FormData();
    formData.append('files', file);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
      'Access-Control-Allow-Origin': '*'
    });
    if(nvNo) {
      return this.http
      .post<FileCreationResponse>(
        `${this.baseUrl}/File?nvNo=${nvNo}&isBrokerOrder=${isBrokerOrder}&isPayment=${isPayment}`,
        formData, {headers}
      );
    }
    return this.http
      .post<FileCreationResponse>(
        `${this.baseUrl}/File?isBrokerOrder=${isBrokerOrder}&isPayment=${isPayment}`,
        formData, {headers}
      );
  }

  getFile(id: number) {
    return this.http.get(`${this.baseUrl}/File/${id}`, {responseType: 'blob' as 'json'});
  }
}
