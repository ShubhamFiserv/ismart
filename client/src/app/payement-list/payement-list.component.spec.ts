import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subscription } from 'rxjs';
import { PaymentService } from '../payment.service';
import { PayementListComponent } from './payement-list.component';

let paymentServiceStub: Partial<PaymentService>;

describe('PayementListComponent', () => {
  let component: PayementListComponent;
  let fixture: ComponentFixture<PayementListComponent>;

  paymentServiceStub = {
    getFilteredPaymentsByFrequency : (freq: string)=>{
      return new Subscription();
    },
    getPaymentsObj: ()=>{
      return of([])
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementListComponent ],
      providers: [ { provide: PaymentService, useValue: paymentServiceStub } ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a card header', () => {
    expect(fixture.nativeElement.querySelector('h5').textContent).toContain('Expenditures')
  });
});
