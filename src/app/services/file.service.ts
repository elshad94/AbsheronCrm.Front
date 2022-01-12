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

  createFile(file: File, nvNo: string) {
    const formData = new FormData();
    formData.append('files', file);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post<FileCreationResponse>(`${this.baseUrl}/File?nvNo=${nvNo}`, formData, {headers});
  }

  getFile(id: number) {
    return this.http.get(`${this.baseUrl}/File/${id}`, {responseType: 'blob' as 'json'});
  }

  createFilePank(file: File) {
    const formData = new FormData();
    formData.append('files', file);
    return this.http.post<PayBankFile>(`${this.baseUrl}/File`, formData);
  }
}
