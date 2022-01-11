import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'https://localhost:44323/api/Tracking';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  constructor(private http: HttpClient) { }

  getTrackingState(transportNumber: string, transportType: 0 | 1): Observable<number> {
    return this.http.get<number>(`${BASE_URL}?nvNo=${transportNumber}&nvType=${transportType}`);
  }
}
