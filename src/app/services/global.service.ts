import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  tokenValue = new BehaviorSubject(this.token);

 set token(tk: string) {
  this.tokenValue.next(tk);
  localStorage.setItem('token', tk);
}

 get token() {
  return localStorage.getItem('token') ?? "";
 }
}
