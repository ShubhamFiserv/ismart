import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { FilterModel } from '../models/filter.model';
import { PaymentService } from '../payment.service';

import { SearchPaymentsComponent } from './search-payments.component';
let paymentServiceStub: Partial<PaymentService>;

describe('SearchPaymentsComponent', () => {
  let component: SearchPaymentsComponent;
  let fixture: ComponentFixture<SearchPaymentsComponent>;
  paymentServiceStub = {
    getCategories : ()=>{
      return of(['Medical','Travels','Loans','Utility Bills','Education','Shopping','Misc'])
    },
    getFiltredPayments : ()=>{
      return new Subscription();
    }
  }; 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPaymentsComponent ],
      providers: [ { provide: PaymentService, useValue: paymentServiceStub } ],
      imports:[FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a card header', () => {
    expect(fixture.nativeElement.querySelector('h5').textContent).toContain('View Transactions')
  });
});
