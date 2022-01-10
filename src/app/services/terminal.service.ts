import TerminalItem from '../model/terminal-item';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NvNoTypeId, TerminalNewData, TerminalNewDataRequest } from '../model/terminal-new-data';
import { TerminalUpdateData } from '../model/terminal-update-data';
import TerminalUpdateRequestData from '../model/TerminalUpdateRequestData';
import errorCodes from 'src/utils/errorCodes';
import logger from 'src/utils/logger';
import { TerminalDataForUpdate } from '../model/TerminalUpdateData';
import { TerminalExpense } from '../model/TerminalExpense';
import { Xidmet } from '../components/terminal-services/new-order/order/order.component';

const baseUrl = 'https://localhost:44323/api/TerminalOrder';
const headers = new HttpHeaders({
  'Content-Type': 'application/json'
});

@Injectable({
  providedIn: 'root'
})
export class TerminalService {
  // used for passing data between first and second terminal order screens
  terminalUpdateData?: TerminalUpdateData;
  // used for passing data between second terminal order screen and terminal file upload screen
  // also used for sending data when creating new terminal order
  terminalUpdateRequestData?: TerminalUpdateRequestData;
  // al-dente
  expenses?: TerminalExpense[];
  totalAmount?: number;
  totalEdv?: number;
  xidmetler?: Xidmet[];
  customer?: string;
  orderDate?: Date;
  orderNo?: string;
  orderStatus?: number;

  constructor(private http: HttpClient) {}

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

  getUpdateTerminalData(orderId: number): Observable<TerminalDataForUpdate> {
    return this.http
      .get<TerminalDataForUpdate>(`${baseUrl}/GetUpdateData/${orderId}`);
  }

  createTerminalOrder(): Observable<HttpResponse<unknown>> {
    if(this.terminalUpdateRequestData === undefined) {
      throw errorCodes.REQUEST_DATA_UNDEFINED;
    }
    if(!this.terminalUpdateRequestData.emptyRefCode) {
      throw errorCodes.EMPTY_REF_CODE_EMPTY;
    }
    if(!this.terminalUpdateRequestData.files || this.terminalUpdateRequestData.files.length < 1) {
      throw errorCodes.FILES_EMPTY;
    }
    if(!this.terminalUpdateRequestData.fullRefCode) {
      throw errorCodes.FULL_REF_CODE_EMPTY;
    }
    if(!this.terminalUpdateRequestData.xidmetler || this.terminalUpdateRequestData.xidmetler.length < 1) {
      throw errorCodes.XIDMETLER_EMPTY;
    }
    return this.http.post(baseUrl + '/Create', this.terminalUpdateRequestData, {observe: 'response', headers});
  }

  updateTerminalOrder(orderId: number): Observable<HttpResponse<unknown>> {
    if(this.terminalUpdateRequestData === undefined) {
      throw errorCodes.REQUEST_DATA_UNDEFINED;
    }
    if(!this.terminalUpdateRequestData.emptyRefCode) {
      throw errorCodes.EMPTY_REF_CODE_EMPTY;
    }
    if(!this.terminalUpdateRequestData.files || this.terminalUpdateRequestData.files.length < 1) {
      throw errorCodes.FILES_EMPTY;
    }
    if(!this.terminalUpdateRequestData.fullRefCode) {
      throw errorCodes.FULL_REF_CODE_EMPTY;
    }
    if(!this.terminalUpdateRequestData.xidmetler || this.terminalUpdateRequestData.xidmetler.length < 1) {
      throw errorCodes.XIDMETLER_EMPTY;
    }
    return this.http.put(
      `${baseUrl}/Update/${orderId}`,
      this.terminalUpdateRequestData,
      {observe: 'response', headers}
    );
  }
}
