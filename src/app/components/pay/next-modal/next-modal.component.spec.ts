import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextModalComponent } from './next-modal.component';

describe('NextModalComponent', () => {
  let component: NextModalComponent;
  let fixture: ComponentFixture<NextModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
