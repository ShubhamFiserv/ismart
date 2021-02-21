import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterModel } from './models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private REST_API_SERVER = "http://localhost:5000";

  constructor(private httpClient: HttpClient) {
    if(environment.production === true){
      this.REST_API_SERVER = "";
    }
   }
  // Subject for Observable payment api call by payment filter model - for getting transactions as per filter 
  // i.e. frequency , month and category
  private paymentsObj$: BehaviorSubject<Object> = new BehaviorSubject(null);
  // Subject for Observable payment api call by frequency of half_year for spend analysis for category
  private paymentsObjForAnalysis$: BehaviorSubject<Object> = new BehaviorSubject(null);
  
  /**
   * Method to get Observable for payment api call by payment filter model
   */
  getPaymentsObj(): Observable<Object> {
      return this.paymentsObj$.asObservable();
  }
  
  /**
   * Method to get Observable for payment api for spend analysis
   */
  getPaymentsObjForAnalysis(): Observable<Object> {
    return this.paymentsObjForAnalysis$.asObservable();
  }
  
  /**
   * Method to create/post payment Object
   * @param payment - payment data we require to post
   */
  createPayment(payment) {
    return this.httpClient.post(this.REST_API_SERVER+"/api/payments",payment);
  }
  
  /**
   * Method to payment api call by payment filter model - for getting transactions as per filter 
    i.e. frequency , month and category
   * @param filterModel - object that includes frequency , month and category
   */
  getFiltredPayments(filterModel: FilterModel) {
    return this.httpClient.get(this.REST_API_SERVER+"/api/payments/"+filterModel.frequency+ (filterModel.month?"/"+filterModel.month:"") +(filterModel.category?"/"+filterModel.category:"")).subscribe(payments=>{
      this.paymentsObj$.next(payments);
    })
  }
  
  /**
   * Method to payment api call by for payment api for spend analysis
   * * @param frequency - in our case it is 'half_hour'
   */
  getFilteredPaymentsByFrequency(frequency:string){
     return this.httpClient.get(this.REST_API_SERVER+"/api/payments/"+frequency).subscribe(payments=>{
      this.paymentsObjForAnalysis$.next(payments);
    })
  }
  /**
   * Method to make a api call for list of all payments 
   * Note :  Athough we are not using it but we can use it future
   */
  getPayments() {
    return this.httpClient.get(this.REST_API_SERVER+"/api/payments");
  }
  
  /**
   * Method to make a api call for list of categories
   */
  getCategories() {
    return this.httpClient.get(this.REST_API_SERVER+"/api/payments/categories");
  }

}
