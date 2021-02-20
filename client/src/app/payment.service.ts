import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterModel } from './models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private REST_API_SERVER = "http://localhost:5000";

  constructor(private httpClient: HttpClient) { }

  private paymentsObj$: BehaviorSubject<Object> = new BehaviorSubject(null);
  private paymentsObjForAnalysis$: BehaviorSubject<Object> = new BehaviorSubject(null);

  getPaymentsObj(): Observable<Object> {
      return this.paymentsObj$.asObservable();
  }

  getPaymentsObjForAnalysis(): Observable<Object> {
    return this.paymentsObjForAnalysis$.asObservable();
  }

  createPayment(payment) {
    return this.httpClient.post(this.REST_API_SERVER+"/api/payments",payment);
  }
   
  getFiltredPayments(filterModel: FilterModel) {
    return this.httpClient.get(this.REST_API_SERVER+"/api/payments/"+filterModel.frequency+ (filterModel.month?"/"+filterModel.month:"") +(filterModel.category?"/"+filterModel.category:"")).subscribe(payments=>{
      this.paymentsObj$.next(payments);
    })
  }

  getFilteredPaymentsByFrequency(frequency:string){
     return this.httpClient.get(this.REST_API_SERVER+"/api/payments/"+frequency).subscribe(payments=>{
      this.paymentsObjForAnalysis$.next(payments);
    })
  }

  getPayments() {
    return this.httpClient.get(this.REST_API_SERVER+"/api/payments");
  }

  getCategories() {
    return this.httpClient.get(this.REST_API_SERVER+"/api/payments/categories");
  }
}
