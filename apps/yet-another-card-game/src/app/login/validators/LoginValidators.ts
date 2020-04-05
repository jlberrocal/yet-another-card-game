import { AbstractControl } from '@angular/forms';

export class LoginValidators {
  static PasswordMatch([original, copy]: [string, string]) {
    return function validate(control: AbstractControl) {
      const originalControl = control.get(original);
      const copyControl = control.get(copy);
      if (copyControl.errors && !copyControl.errors.passwordMismatch) {
        return;
      }

      if (originalControl.value !== copyControl.value) {
        copyControl.setErrors({ passwordMismatch: true });
      } else {
        copyControl.setErrors(null);
      }

      return null;
    }
  }
}
