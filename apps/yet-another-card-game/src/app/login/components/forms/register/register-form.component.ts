import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterDto } from '@innoware/api-interfaces';
import { LoginValidators } from '../../../validators/LoginValidators';

@Component({
  selector: 'innoware-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  @Output()
  register = new EventEmitter<RegisterDto>();

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50)
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    }, LoginValidators.PasswordMatch(['password', 'repeatPassword']));
  }

  submit() {
    this.register.next(this.form.value);
  }

}
