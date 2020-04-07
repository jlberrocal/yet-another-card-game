import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlreadyLoginGuard } from './guards/already-login.guard';
import { LoginRequiredGuard } from './guards/login-required.guard';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
        canActivate: [AlreadyLoginGuard]
      },
      {
        path: 'home',
        loadChildren: () => import('./template/template.module').then(m => m.TemplateModule),
        canActivate: [LoginRequiredGuard]
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.GameModule),
        canActivate: [LoginRequiredGuard]
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
