import TerminalItem from '../model/terminal-item';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:44323/api/TerminalOrder';

@Injectable({
    providedIn: 'root'
})
export class TerminalService {
    constructor(private http: HttpClient) {}  

    getTerminalOrders(): Observable<TerminalItem[]> {
        return this.http.get<TerminalItem[]>(baseUrl + '/GetAllTerminalOrders');
    }

    deleteTerminalOrder(orderId: number): Observable<HttpResponse<unknown>> {
        return this.http.delete(`${baseUrl}/Delete/${orderId}`, {observe: 'response'});
    }
}
