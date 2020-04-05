import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { LoginDto, RegisterDto } from '@innoware/api-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'innoware-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  form: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  login(dto: LoginDto) {
    this.loginService.login(dto).subscribe(result => this.goToDashboard(result));
  }

  register(dto: RegisterDto) {
    this.loginService.register(dto).subscribe(result => this.goToDashboard(result));
  }

  goToDashboard(result: boolean) {
    if (result) {
      return this.router.navigateByUrl('/home');
    }
  }
}
