import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AvailableRoomsComponent } from './available-rooms/available-rooms.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { TranslocoRootModule } from '../i18n/transloco-root.module';


@NgModule({
  declarations: [HomeComponent, AvailableRoomsComponent, RoomFormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    TranslocoRootModule,
    SharedModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule
  ],
  exports: [TranslocoRootModule]
})
export class HomeModule {
}
