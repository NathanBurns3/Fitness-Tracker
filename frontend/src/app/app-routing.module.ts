import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExerciseComponent } from './add-exercise/views/add-exercise.component';
import { HomeComponent } from './home-page/views/home.component';
import { AddMealComponent } from './add-meal/views/add-meal.component';
import { UserSettingsComponent } from './user-settings/views/user-settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-exercise', component: AddExerciseComponent },
  { path: 'add-meal', component: AddMealComponent },
  { path: 'user-settings', component: UserSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
