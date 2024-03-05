import { NgModule } from '@angular/core';
import { UserSettingsComponent } from './views/user-settings.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserSettingsComponent],
  imports: [CommonModule, RouterModule],
  exports: [UserSettingsComponent],
})
export class UserSettingsModule {}
