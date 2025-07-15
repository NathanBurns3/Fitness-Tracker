import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserSettingsModule } from '../user-settings/user-settings.module';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
  ],
  imports: [BrowserModule, FormsModule, UserSettingsModule, RecaptchaV3Module],
  exports: [
    LoginComponent,
    SignupComponent,
    VerifyEmailComponent,
    ResetPasswordComponent,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6LckHoArAAAAAFcaOhXq9n53IBL135G0JTwTB4a9',
    },
  ],
})
export class AuthModule {}
