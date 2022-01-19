import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalServicesComponent } from './terminal-services.component';

describe('TerminalServicesComponent', () => {
  let component: TerminalServicesComponent;
  let fixture: ComponentFixture<TerminalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
