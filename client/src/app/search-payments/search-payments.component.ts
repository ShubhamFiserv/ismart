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
  
  //categories list to include All option as well to show all types of payments
  categories = ["All"];
  private monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthsList = []; 
  filterModel = FilterModel.getInstance();

  constructor(private paymentService:PaymentService) { }
  
  ngOnInit(): void {
    this.filterModel.category = 'All';
    //for populating previous 6 months list in case of frequency selected is Monthly
    this.getLastSixMonthsMap();
    //getCategories api call to populate categories data
    this.paymentService.getCategories().subscribe((categories:any[])=>{
      //In category dropdown we need to populate all the categories including 'All' option as well
      this.categories = this.categories.concat(categories);
    });
    //Intial api call for triggering payment call by defualt filterModel
    this.onSearchHandler();  
  }
  
  /**
   * Utility method to get array of last 6 months map.
   */
  getLastSixMonthsMap() {
    let today = new Date();
    let d ;
    for(var i = 6; i > 0; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() +1 - i, 1);
      this.monthsList.push({"name": this.monthNames[d.getMonth()], value: this.monthNames.indexOf( this.monthNames[d.getMonth()])});
    }
    this.monthsList  = this.monthsList.reverse();
  }
  
  /**
   * Method to call an api in case of any filter property update
   */
  onSearchHandler(){
    if(this.filterModel.frequency === 'Monthly' && this.filterModel.month ==='NA'){
        this.filterModel.month = this.monthsList[0].value;
    }
    this.paymentService.getFiltredPayments(this.filterModel);
  }

}
