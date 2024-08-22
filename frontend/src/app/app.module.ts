import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home-page/home.module';
import { AddExerciseModule } from './add-exercise/add-exercise.module';
import { RouterModule } from '@angular/router';
import { AddMealModule } from './add-meal/add-meal.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserSettingsModule } from './user-settings/user-settings.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HomeModule,
    AddExerciseModule,
    AddMealModule,
    UserSettingsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
