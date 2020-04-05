import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from '@innoware/api-interfaces';

@Component({
  selector: 'innoware-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  form: FormGroup;

  @Output()
  login = new EventEmitter<LoginDto>();

  constructor() {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  submit() {
    this.login.emit(this.form.value);
  }

}
