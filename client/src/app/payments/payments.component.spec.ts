import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PaymentService } from '../payment.service';

import { PaymentsComponent } from './payments.component';
let paymentServiceStub: Partial<PaymentService>;

describe('PaymentsComponent', () => {
  let component: PaymentsComponent;
  let fixture: ComponentFixture<PaymentsComponent>;
  paymentServiceStub = {
    getCategories:()=>{
      return of(['Medical','Travels','Loans','Utility Bills','Education','Shopping','Misc'])
    }
  }; 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsComponent ],
      imports:[FormsModule],
      providers: [ { provide: PaymentService, useValue: paymentServiceStub } ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a card header', () => {
    expect(fixture.nativeElement.querySelector('h5').textContent).toContain('Make / Recieve Payements')
  });
});
