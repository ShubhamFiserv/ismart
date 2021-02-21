import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PaymentService } from '../payment.service';

import { PayementAnalysisComponent } from './payement-analysis.component';

let paymentServiceStub: Partial<PaymentService>;

describe('PayementAnalysisComponent', () => {
  let component: PayementAnalysisComponent;
  let fixture: ComponentFixture<PayementAnalysisComponent>;
  paymentServiceStub = {
    getPaymentsObjForAnalysis: ()=>{
      return of([])
    }
  }; 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementAnalysisComponent ],
      providers: [ { provide: PaymentService, useValue: paymentServiceStub } ],
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

  it('should have a card header', () => {
    expect(fixture.nativeElement.querySelector('h5').textContent).toContain('Spend Analysis')
  });
});
