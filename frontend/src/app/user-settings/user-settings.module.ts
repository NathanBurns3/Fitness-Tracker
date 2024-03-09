import { NgModule } from '@angular/core';
import { UserSettingsComponent } from './views/user-settings.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { FormsModule } from '@angular/forms';
import { ContactInformationComponent } from './contact-information/contact-information.component';

@NgModule({
  declarations: [
    UserSettingsComponent,
    PersonalInformationComponent,
    ContactInformationComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [UserSettingsComponent],
})
export class UserSettingsModule {}
