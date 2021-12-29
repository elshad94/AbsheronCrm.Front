import TerminalItem from '../model/terminal-item';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NvNoTypeId, TerminalNewData, TerminalNewDataRequest } from '../model/terminal-new-data';
import { TerminalUpdateData } from '../model/terminal-update-data';
import TerminalUpdateRequestData from '../model/TerminalUpdateRequestData';

const baseUrl = 'https://localhost:44323/api/TerminalOrder';

@Injectable({
    providedIn: 'root'
})
export class TerminalService {
    // used for passing data between first and second terminal order screens
    terminalUpdateData?: TerminalUpdateData;
    // used for passing data between second terminal order screen and terminal file upload screen
    // also used for sending data when creating new terminal order
    terminalUpdateRequestData?: TerminalUpdateRequestData;

    constructor(private http: HttpClient) {}  

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    getTerminalOrders(): Observable<TerminalItem[]> {
        return this.http.get<TerminalItem[]>(baseUrl + '/GetAllTerminalOrders');
    }

    deleteTerminalOrder(orderId: number): Observable<HttpResponse<unknown>> {
        return this.http.delete(`${baseUrl}/Delete/${orderId}`, {observe: 'response'});
    }

    getNewTerminalData(nvNoTypeId: NvNoTypeId): Observable<TerminalNewData> {
        const reqData: TerminalNewDataRequest = {
            nvNoTypeId
        }; 
        return this.http
            .post<TerminalNewData>(`${baseUrl}/GetCreateData`, reqData);
    }
}
