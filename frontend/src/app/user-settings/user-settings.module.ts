import { NgModule } from '@angular/core';
import { UserSettingsComponent } from './views/user-settings.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserSettingsComponent, PersonalInformationComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [UserSettingsComponent],
})
export class UserSettingsModule {}
