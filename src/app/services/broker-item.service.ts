import { BrokerItem } from './../model/broker-item';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BrokerRequestItem } from '../model/broker-request.model';
@Injectable({
  providedIn: 'root',
})
export class BrokerItemService {

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
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
  deleteBrokerItem1(item: any = []) {
    console.log(item);
    return this.http.delete(`${this.DeleteBrokerItem}${item}`);
  }
  updateBrokerItem1(id:any):Observable<any> {
    return this.http.get("https://localhost:44323/api/Broker/"+id);
  }
  getBrokerCreate(): Observable<any>{
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    return this.http.get('https://localhost:44323/api/Broker')
  }
  postBrokerCreateFile(): Observable<any>{
    const httpHeaders = new HttpHeaders();
    httpHeaders.append('content-type', 'application/json');
    return this.http.post('https://localhost:44323/api/File',{
      "fileId": 0,
      "uri": "string"
    })
  }
  postBrokerItem(data: BrokerRequestItem):Observable<any> {
    // const httpHeaders = new HttpHeaders();
    // httpHeaders.append('content-type', 'application/json');
    // return this.http.post(this.PostBroker,JSON.stringify(data));


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });



    let options = { headers: headers };
    return this.http.post<any>( this.PostBroker,JSON.stringify({
        notes: 'string',
        orderStatusId: 5,
        transportTypeId: 24,
        transportNumber: '222',
        expenses: [
          {
            id: 1,
          },
        ],
        fileDetails: [
          {
            fileId: 67,
            docTypeId: 11,
          },
        ],
      }),
      { headers }
    );
    // return this.http.post<any>( this.PostBroker, {

    // }, this.httpOptions)



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

  postBrokerItemSave(data: any):Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let options = { headers: headers };
    return this.http.post<any>(
      this.PostBroker,
      JSON.stringify({
        notes: 'string',
        orderStatusId: 4,
        transportTypeId: 24,
        transportNumber: 'string',
        expenses: [
          {
            id: 2,
          },
        ],
        fileDetails: [
          {
            fileId: 67,
            docTypeId: 11,
          },
        ],
      }),
      { headers }
    );
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

