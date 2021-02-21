import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payement-analysis',
  templateUrl: './payement-analysis.component.html',
  styleUrls: ['./payement-analysis.component.css']
})
export class PayementAnalysisComponent implements OnInit {
  
  payments = [];
  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.paymentService.getFilteredPaymentsByFrequency('half_year');
    this.paymentService.getPaymentsObjForAnalysis().subscribe((payments:any[])=>{
      if(payments && payments.length >0 ){
        this.payments = payments;
        this.payments = this.mapToObjectForPieCharts(payments,'category');
        this.pieChartLabels = Object.keys(this.payments);
        this.pieChartData = Object.values(this.payments);
      }  
    });
  }

  pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 10,
        usePointStyle: true
      }
    },
   
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItems, data) {
          return data.datasets[0].data[tooltipItems.index] + ' %';
        }
      }
    },
  };
  
  /**
   * Method is to convert payments array into Object required for showing data on pie chart
   * @param paymentsArray - array of payments for transaction for previous 6 month from the time data is fetched.
   * @param property - property for gruoping in our case we are showing spend anaysis by category so value here is 'category'
   */
  private mapToObjectForPieCharts(paymentsArray, property) {
    return paymentsArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key] ) {
        acc[key] = 1;
      }else {
        acc[key] += 1;
      }
      return acc
    }, {})
  }

  pieChartLabels: Label[] = [];

  pieChartData: number[] = [];

  pieChartType: ChartType = 'pie';

  pieChartLegend = true;

  pieChartPlugins = [];

  pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)','yellow','red','green'],
    },
  ];

}
