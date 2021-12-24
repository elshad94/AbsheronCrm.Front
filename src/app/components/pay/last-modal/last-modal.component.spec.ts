import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastModalComponent } from './last-modal.component';

describe('LastModalComponent', () => {
  let component: LastModalComponent;
  let fixture: ComponentFixture<LastModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
