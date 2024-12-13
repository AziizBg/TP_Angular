import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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

    const firstTwoDigits = Number(cin.slice(0, 2));

    if (age >= 60 && (firstTwoDigits < 0 || firstTwoDigits > 19)) {
      return { cinInvalid: true };
    }

    if (age < 60 && firstTwoDigits <= 19) {
      return { cinInvalid: true };
    }

    return null;
  };
}
