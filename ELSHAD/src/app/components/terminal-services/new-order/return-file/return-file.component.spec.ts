import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnFileComponent } from './return-file.component';

describe('ReturnFileComponent', () => {
  let component: ReturnFileComponent;
  let fixture: ComponentFixture<ReturnFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
