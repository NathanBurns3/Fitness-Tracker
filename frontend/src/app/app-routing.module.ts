import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExerciseComponent } from './add-exercise/views/add-exercise.component';
import { HomeComponent } from './home-page/views/home.component';
import { AddMealComponent } from './add-meal/views/add-meal.component';
import { UserSettingsComponent } from './user-settings/views/user-settings.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'add-exercise',
    component: AddExerciseComponent,
  },
  { path: 'add-meal', component: AddMealComponent },
  {
    path: 'user-settings',
    component: UserSettingsComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
