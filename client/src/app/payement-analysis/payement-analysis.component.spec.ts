import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementAnalysisComponent } from './payement-analysis.component';

describe('PayementAnalysisComponent', () => {
  let component: PayementAnalysisComponent;
  let fixture: ComponentFixture<PayementAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
