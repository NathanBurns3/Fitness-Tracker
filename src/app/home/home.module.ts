import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './views/home.component';
import { DailySummaryComponent } from './summaries/daily/views/daily-summary.component';
import { MonthlySummaryComponent } from './summaries/monthly/views/monthly-summary.component';
import { YearlySummaryComponent } from './summaries/yearly/views/yearly-summary.component';

@NgModule({
  declarations: [
    HomeComponent,
    DailySummaryComponent,
    MonthlySummaryComponent,
    YearlySummaryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  exports: [HomeComponent],
  providers: [],
  bootstrap: [HomeComponent],
})
export class HomeModule {}
