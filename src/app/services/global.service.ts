import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';   


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  tokenLengthValue = new BehaviorSubject(this.tokenLength);

  get tokenLength() {
    return JSON.parse(localStorage.getItem("token") ?? "").length;
  }

}
