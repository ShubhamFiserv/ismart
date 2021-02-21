import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payement-list',
  templateUrl: './payement-list.component.html',
  styleUrls: ['./payement-list.component.css']
})
export class PayementListComponent implements OnInit {
  
  expenditures =  []
  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    //subscribe to getPaymentsObj Subscription For showing the data specific to the filter selected of view transactions box
    this.paymentService.getPaymentsObj().subscribe((payments:any[])=>{
      this.expenditures = payments;
    });
  }
}
