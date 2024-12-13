import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function cinAgeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const age = control.get('age')?.value;
    const cin = control.get('cin')?.value;

    if (!age || !cin) {
      return null;
    }

    if (cin.length !== 8) {
      return null;
    }

    const firstTwoDigits = Number(cin.substring(0, 2));
console.log('firstTwoDigits', firstTwoDigits);
    if (age >= 60) {
      if (firstTwoDigits >= 0 && firstTwoDigits <= 19) {
        return null;
      } else {
        return { cinInvalid: true };
      }
    } else {
      if (firstTwoDigits > 19) {
        return null;
      } else {
        return { cinInvalid: true };
      }
    }
  };
}
