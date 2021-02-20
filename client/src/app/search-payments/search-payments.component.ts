import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { PaymentService } from '../payment.service';
import {FilterModel}  from '../models/filter.model';

@Component({
  selector: 'app-search-payments',
  templateUrl: './search-payments.component.html',
  styleUrls: ['./search-payments.component.css']
})
export class SearchPaymentsComponent implements OnInit {
  
  categories = []
  private monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthsList = []; 
  filterModel = FilterModel.getInstance();

  constructor(private paymentService:PaymentService) { }
  
  ngOnInit(): void {
    this.getLastSixMonthsMap();
    this.paymentService.getCategories().subscribe((categories:any[])=>{
      this.categories = categories;
    });
    this.onSearchHandler();  
  }

  getLastSixMonthsMap() {
    let today = new Date();
    let d ;
    for(var i = 6; i > 0; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() +1 - i, 1);
      this.monthsList.push({"name": this.monthNames[d.getMonth()], value: this.monthNames.indexOf( this.monthNames[d.getMonth()])});
    }
    this.monthsList  = this.monthsList.reverse();
  }

  onSearchHandler(){
    if(this.filterModel.frequency === 'Monthly'){
        this.filterModel.month = this.monthsList[0].value;
    }
    this.paymentService.getFiltredPayments(this.filterModel);
  }

}