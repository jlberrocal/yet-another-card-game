import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { FlexModule } from '@angular/flex-layout';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DirectivesModule } from '../shared/directives/directives.module';
import { SharedModule } from '../shared/shared.module';
import { TranslocoRootModule } from '../i18n/transloco-root.module';
import { RegisterFormComponent } from './components/forms/register/register-form.component';
import { LoginFormComponent } from './components/forms/login/login-form.component';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from './components/login.component';
import { LoginService } from './services/login.service';

export const loader = ['en', 'es'].reduce((acc, lang) => {
  acc[lang] = () => import(`./i18n/${lang}.json`);
  return acc;
}, {});

@NgModule({
  declarations: [LoginComponent, LoginFormComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FlexModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    DirectivesModule,
    SharedModule,
    TranslocoRootModule,
    MatTabsModule
  ],
  providers: [
    LoginService,
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'login',
        loader
      }
    }
  ]
})
export class LoginModule {
}
