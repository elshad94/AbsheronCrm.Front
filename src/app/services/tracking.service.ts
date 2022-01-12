import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrlsService } from './api-urls.service';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  baseUrl!: string;
  constructor(private http: HttpClient, private apiUrlService: ApiUrlsService) {
    this.baseUrl = apiUrlService.getCrmAPIURI();
  }

  getTrackingState(transportNumber: string, transportType: 0 | 1): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/Tracking?nvNo=${transportNumber}&nvType=${transportType}`);
  }
}
