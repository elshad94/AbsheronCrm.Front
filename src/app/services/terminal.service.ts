import TerminalItem from '../model/terminal-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrokerRequestItem } from '../model/broker-request.model';

const baseUrl = 'https://localhost:44323/api/TerminalOrder';

@Injectable({
    providedIn: 'root'
})
export class TerminalService {
    constructor(private http: HttpClient) {}  

    getTerminalOrders(): Observable<TerminalItem[]> {
        return this.http.get<TerminalItem[]>(baseUrl + '/GetAllTerminalOrders');
    }
}
