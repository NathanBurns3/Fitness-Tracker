import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserSettingsModule } from '../user-settings/user-settings.module';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [BrowserModule, FormsModule, UserSettingsModule, RecaptchaV3Module],
  exports: [LoginComponent, SignupComponent],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LckHoArAAAAAFcaOhXq9n53IBL135G0JTwTB4a9',
    },
  ],
})
export class AuthModule {}
