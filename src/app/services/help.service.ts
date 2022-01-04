import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import HelpRequestBody from '../model/HelpRequestBody';

const headers = new HttpHeaders({
    'Content-Type': 'application/json'
});

const baseUrl = 'https://localhost:44323/api/Help';

@Injectable({
    providedIn: 'root'
})
export class HelpService {

    constructor(private http: HttpClient) {}

    sendEmail(email: HelpRequestBody): Observable<unknown> {
        return this.http.post(baseUrl, email, {headers});
    }
}
