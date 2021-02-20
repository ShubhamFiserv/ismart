import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PaymentsComponent } from './payments/payments.component';
import { SearchPaymentsComponent } from './search-payments/search-payments.component';
import { PayementListComponent } from './payement-list/payement-list.component';
import { PayementAnalysisComponent } from './payement-analysis/payement-analysis.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PaymentsComponent,
    SearchPaymentsComponent,
    PayementListComponent,
    PayementAnalysisComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
