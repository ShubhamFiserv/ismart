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
      this.paymentService.getCategories().subscribe((categories:any[])=>{
        this.categories = categories;
      });  
  }

  onSubmit(form: NgForm) {
    this.paymentService.createPayment(form.value).subscribe(()=>{
      this.paymentService.getFilteredPaymentsByFrequency('half_year');
      this.paymentService.getFiltredPayments(FilterModel.getInstance());
      this.payment = new Payment();
      form.reset(this.payment);
      this.payment.paymentDate = new Date();
    },error=>{
      form.controls.amount.setErrors({nobalance: true});
    });
  }

}
