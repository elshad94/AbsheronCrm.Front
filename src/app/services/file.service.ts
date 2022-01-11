import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ErrorResponse from '../model/ErrorResponse';
import FileCreationResponse from '../model/FileCreationTerminalResponse';
import { PayBankFile } from '../model/payBankFile';

const BASE_URL = 'https://localhost:44323/api';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http: HttpClient) { }

  createFile(file: File, nvNo: string) {
    const formData = new FormData();
    formData.append('files', file);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http.post<FileCreationResponse>(`${BASE_URL}/File?nvNo=${nvNo}`, formData, {headers});
  }

  getFile(id: number) {
    return this.http.get(`${BASE_URL}/File/${id}`, {responseType: 'blob' as 'json'});
  }

  createFilePank(file: File) {
    const formData = new FormData();
    formData.append('files', file);
    return this.http.post<PayBankFile>(`${BASE_URL}/File`, formData);
  }
}
