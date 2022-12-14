import TerminalItem from '../model/terminal-item';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
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
import { ApiUrlsService } from './api-urls.service';

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
  isValid = false;
  fullXidmetler: any;

  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }

  getExpensePrice(expenseId: number): Observable<number> {
    const params = new HttpParams()
      .set('expenseId', expenseId);
      return this.http.get<number>(`${this.baseUrl}/TerminalOrder/GetExpensePrice`, {params});
  }

  getTerminalOrders(): Observable<TerminalItem[]> {
    return this.http.get<TerminalItem[]>(`${this.baseUrl}/TerminalOrder/GetAllTerminalOrders`);
  }

  deleteTerminalOrder(orderId: number): Observable<HttpResponse<unknown>> {
    return this.http.delete(`${this.baseUrl}/TerminalOrder/Delete/${orderId}`, {observe: 'response'});
  }

  getNewTerminalData(nvNoTypeId: NvNoTypeId): Observable<TerminalNewData> {
    const reqData: TerminalNewDataRequest = {
      nvNoTypeId
    };
    return this.http
      .post<TerminalNewData>(`${this.baseUrl}/TerminalOrder/GetCreateData`, reqData);
  }

  getUpdateTerminalData(orderId: number): Observable<TerminalDataForUpdate> {
    return this.http
      .get<TerminalDataForUpdate>(`${this.baseUrl}/TerminalOrder/GetUpdateData/${orderId}`);
  }

  createTerminalOrder(updateData: any): Observable<HttpResponse<unknown>> {
    if(this.terminalUpdateRequestData === undefined) {
      throw errorCodes.REQUEST_DATA_UNDEFINED;
    }
    if(!this.terminalUpdateRequestData.xidmetler || this.terminalUpdateRequestData.xidmetler.length < 1) {
      throw errorCodes.XIDMETLER_EMPTY;
    }
    this.terminalUpdateRequestData.notes = this.terminalUpdateRequestData.notes.trim();
    this.terminalUpdateRequestData.total = this.totalEdv;

    let xidmetler = [];
    for(const x of updateData) {
      for(const y of x) {
        xidmetler.push(y);
      }
    }
    this.terminalUpdateRequestData.xidmetler = xidmetler.map((x: any) => {return {
      nvNo: x.nvNo,
      edv: x.edv,
      expenseId: x.expenseId,
      miqdar: x.count,
      qiymet: x.amount,
      emptyRefCode: x.emptyRefCode,
      fullRefCode: x.fullRefCode,
      isExpenseReadOnly: x.isReadOnly
    }});
    return this.http.post(this.baseUrl + '/TerminalOrder/Create', this.terminalUpdateRequestData, {observe: 'response', headers});
  }

  updateTerminalOrder(updateData: any, orderId: number): Observable<HttpResponse<unknown>> {
    if(this.terminalUpdateRequestData === undefined) {
      throw errorCodes.REQUEST_DATA_UNDEFINED;
    }
    if(!this.terminalUpdateRequestData.xidmetler || this.terminalUpdateRequestData.xidmetler.length < 1) {
      throw errorCodes.XIDMETLER_EMPTY;
    }
    this.terminalUpdateRequestData.notes = this.terminalUpdateRequestData.notes.trim();
    this.terminalUpdateRequestData.total = this.totalEdv;

    let xidmetler = [];
    for(const x of updateData) {
      for(const y of x) {
        xidmetler.push(y);
      }
    }

    this.terminalUpdateRequestData.xidmetler = xidmetler.map((x: any) => {return {
      nvNo: x.nvNo,
      edv: x.edv,
      expenseId: x.expenseId,
      miqdar: x.count,
      qiymet: x.amount,
      emptyRefCode: x.emptyRefCode,
      fullRefCode: x.fullRefCode,
      isExpenseReadOnly: x.isReadOnly
    }});
    return this.http.put(
      `${this.baseUrl}/TerminalOrder/Update/${orderId}`,
      this.terminalUpdateRequestData,
      {observe: 'response', headers}
    );
  }

  printInv(orderId: number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/TerminalOrder/GetInvId?orderId=${orderId}`);

  }
}
