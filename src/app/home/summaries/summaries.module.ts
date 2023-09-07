import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { DailySummaryComponent } from './daily/views/daily-summary.component';
import { MonthlySummaryComponent } from './monthly/views/monthly-summary.component';
import { YearlySummaryComponent } from './yearly/views/yearly-summary.component';

@NgModule({
  declarations: [
    DailySummaryComponent,
    MonthlySummaryComponent,
    YearlySummaryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  exports: [
    DailySummaryComponent,
    MonthlySummaryComponent,
    YearlySummaryComponent,
  ],
  providers: [],
  bootstrap: [
    DailySummaryComponent,
    MonthlySummaryComponent,
    YearlySummaryComponent,
  ],
})
export class SummariesModule {}
