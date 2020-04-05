import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { TemplateComponent } from './template.component';
import { DashboardComponent } from '../home/dashboard/dashboard.component';
import { HomeComponent } from '../home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@ngneat/transloco';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RoomFormComponent } from '../home/dashboard/room-form/room-form.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from '../shared/interceptors/auth.interceptor.service';


@NgModule({
  declarations: [TemplateComponent, DashboardComponent, HomeComponent, RoomFormComponent],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    TranslocoModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    SharedModule,
    DirectivesModule,
    MatButtonModule,
    MatTabsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class TemplateModule {
}
