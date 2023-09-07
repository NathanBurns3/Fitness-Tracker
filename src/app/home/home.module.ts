import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SummariesModule } from './summaries/summaries.module';

import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './views/home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [BrowserModule, AppRoutingModule, SummariesModule],
  exports: [HomeComponent],
  providers: [],
  bootstrap: [HomeComponent],
})
export class HomeModule {}
