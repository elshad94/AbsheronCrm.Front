import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ErrorResponse from '../model/ErrorResponse';
import FileCreationResponse from '../model/FileCreationTerminalResponse';

const BASE_URL = 'https://localhost:44323/api';

@Injectable({
    providedIn: 'root'
})
export class FileService {
    constructor(private http: HttpClient) { }

    createFile(file: File, nvNo: string) {
        const formData = new FormData();
        formData.append('files', file);
        return this.http.post<FileCreationResponse>(`${BASE_URL}/File?nvNo=${nvNo}`, formData);
    }

    getFile(id: number) {
        return this.http.get(`${BASE_URL}/File/${id}`, {responseType: 'blob' as 'json'});
    }
}
