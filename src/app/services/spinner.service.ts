import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/dist/types/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor() { }

  isLoading = new Subject<boolean>();
  show(){
    this.isLoading.next(true)
  }

  hide(){
    this.isLoading.next(false)
  }

}
