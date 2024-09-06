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
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HomeModule,
    AddExerciseModule,
    AddMealModule,
    UserSettingsModule,
    AuthModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
