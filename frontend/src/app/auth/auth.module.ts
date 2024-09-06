import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserSettingsModule } from '../user-settings/user-settings.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [BrowserModule, FormsModule, UserSettingsModule],
  exports: [LoginComponent, SignupComponent],
})
export class AuthModule {}
