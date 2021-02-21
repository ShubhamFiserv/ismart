import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FilterModel } from '../models/filter.model';
import { Payment } from '../models/payment.model';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  categories = [];
  payment:Payment = new Payment();

  constructor(private paymentService:PaymentService) { }

  ngOnInit(): void {
      //getCategories api call to populate categories data
      this.paymentService.getCategories().subscribe((categories:any[])=>{
        this.categories = categories;
      });  
  }
 
  /**
   * Method to handle payment Submission
   * @param form - payment form
   */
  onSubmit(form: NgForm) {
    this.paymentService.createPayment(form.value).subscribe(()=>{
      //As new payment successfully created need to make api calls for inclusion of just created payment to 
      //payment-list and spend-analysis screen
      this.paymentService.getFilteredPaymentsByFrequency('half_year');
      this.paymentService.getFiltredPayments(FilterModel.getInstance());
      //Need to reset the payment model and form
      this.payment = new Payment();
      form.reset(this.payment);
    },error=>{
      //In case of account low balance setting the custom error
      // TODO: need to write code to handle specific scenarios when we will get diffrent errors from backend
      // Assumption here as we will only be getting low balance error
      form.controls.amount.setErrors({lowbalance: true});
    });
  }

}
