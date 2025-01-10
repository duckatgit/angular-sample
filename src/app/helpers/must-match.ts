import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl && control && control.value !== checkControl.value) {
        checkControl.setErrors({ matching: true });
        return { matching: true };
      } else {
        if (
          checkControl &&
          checkControl.errors &&
          checkControl.errors['matching']
        ) {
          checkControl.setErrors(null);
        }
        return null;
      }
    };
  }
}
