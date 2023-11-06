import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExerciseComponent } from './add-exercise/views/add-exercise.component';
import { HomeComponent } from './home/views/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-exercises', component: AddExerciseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
