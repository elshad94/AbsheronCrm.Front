import { Component, OnInit } from '@angular/core';
import { TrackingService } from 'src/app/services/tracking.service';
import { errorAlert } from 'src/utils/alerts';
import logger from 'src/utils/logger';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent {
  transportType: 0 | 1 = 0;
  transportNumber = '';
  transportState = 0;
  percentage = 0;
  showProgress = false;
  checkClasses = [
    'step-icon',
    'step-icon',
    'step-icon',
    'step-icon',
    'step-icon',
    'step-icon',
  ];
  checkTexts = [
    'Yük yoldadır',
    'Yük terminaldadır',
    'Sifariş qəbulu-terminal',
    'Gömrük rəsmilləşdirməsi başladı',
    'Gömrük rəsmilləşdirməsi bitdi',
    'Vaqon/konteyner stansiyadan gedib',
  ];

  constructor(private trackingService: TrackingService) { }

  setTransportType(type: 0 | 1) {
    this.transportType = type;
  }

  getTrackingState() {
    if(this.transportType === 0 &&
       (isNaN(this.transportNumber as any) || this.transportNumber.includes('.'))) {
      errorAlert('Vaqon nömrəsi ancaq tam rəqəm ola bilər', 'Uğursuz');
      return;
    }
    this.trackingService
      .getTrackingState(this.transportNumber, this.transportType)
      .subscribe(transportState => {
        if(transportState === -1) {
          this.showProgress = false;
          return;
        }
        this.showProgress = true;
        this.percentage = Math.round((transportState + 1) / 6 * 100);
        this.transportState = transportState;
        for(let i = 0; i <= transportState; i++) {
          this.checkClasses[i] = 'step-icon';
        }
        for(let i = transportState + 1; i < this.checkClasses.length; i++) {
          this.checkClasses[i] = 'step-icon-unchecked';
        }
      });
  }

}
