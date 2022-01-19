import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerOrderComponent } from './broker-order.component';

describe('BrokerOrderComponent', () => {
  let component: BrokerOrderComponent;
  let fixture: ComponentFixture<BrokerOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokerOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokerOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
