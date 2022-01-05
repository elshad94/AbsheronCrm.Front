import { fileDetails } from './../model/broker-request.model';
import { BrokerItem } from './../model/broker-item';
import { HttpClient, HttpHeaders ,HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrokerRequestItem } from '../model/broker-request.model';
import { BrokerPostItem } from '../model/broker-post-item.model';

@Injectable({
    providedIn: 'root',
})
export class BrokerItemService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    constructor(
    private http: HttpClient,
    @Inject('BrokerItemUrl') private BrokerItemUrl: string,
    @Inject('DeleteBrokerItem') private DeleteBrokerItem: string,
    @Inject('PostBrokerItem') private PostBroker: string,
    @Inject('PutBrokerItem') private PutBrokerItem: string

    ) {}
    getBrokerItem(): Observable<BrokerItem[]> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('content-type', 'application/json');
        console.log('test');
        return this.http.get<BrokerItem[]>(this.BrokerItemUrl + '/BrokerList');
    }
    deleteBrokerItem1(item:BrokerItem[] = []) {
        console.log(item);
        return this.http.delete(`${this.DeleteBrokerItem}${item}`);
    }
    updateBrokerItem1(id:any):Observable<BrokerRequestItem> {
        return this.http.get<BrokerRequestItem>('https://localhost:44323/api/Broker/'+id);
    }
    updateBrokerSave(id:any ,data: BrokerPostItem):Observable<any> {
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('content-type', 'application/json');
        return this.http.put('https://localhost:44323/api/Broker/'+id ,data);

    }
    getBrokerCreate(): Observable<any>{
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('content-type', 'application/json');
        return this.http.get('https://localhost:44323/api/Broker');
    }
    postBrokerCreateFile(data:fileDetails): Observable<any>{
        debugger;
        const httpHeaders = new HttpHeaders();
        httpHeaders.append('content-type', 'application/json');
        return this.http.post('https://localhost:44323/api/File',{
            fileDetails: [
                {
                    fileId: data.fileId,
                    docTypeId:data.documentTypeId,
                },
            ],
        });
    }
    postBrokerItem(data: BrokerPostItem): Observable<HttpResponse<unknown>>{
    // const httpHeaders = new HttpHeaders();
    // httpHeaders.append('content-type', 'application/json');
    // return this.http.post(this.PostBroker,JSON.stringify(data));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            observe: 'response', // to display the full response
            responseType: 'json'
        });
        const options = { headers: headers };
        return this.http.post<any>( this.PostBroker,
            JSON.stringify(data),
            {observe: 'response'}
        );
    }

    postBrokerItemSave(data: BrokerPostItem):Observable<HttpResponse<any>> {

        console.log(data);
        const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post<any>(
            this.PostBroker,
            data,
            {observe: 'response', headers}
        );


        // JSON.stringify({
        //   notes: data.notes,
        //   orderStatusId: 4,
        //   transportTypeId: data.transportTypeId,
        //   transportNo: data.transportNo,
        //   expenses: data.expenses,
        //   fileDetails: data.documents,
        // })


    //   let headers = new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     "Authorization": "ea88f5e5-a850-43eb-aba5-ab483ee46c1b"
    //   });
    // let options = { headers: headers };
    //  return this.http.post<any>("http://89.147.203.83:7080/api/v1/User/Login",JSON.stringify({
    //   "username":"admin",
    //   "password":"admin123"
    //   }),options);
    }
}

