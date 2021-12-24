import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalAccountComponent } from './legal-account.component';

describe('LegalAccountComponent', () => {
  let component: LegalAccountComponent;
  let fixture: ComponentFixture<LegalAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LegalAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
