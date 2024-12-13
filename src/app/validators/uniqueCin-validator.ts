import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CvService } from '../cv/services/cv.service';

export function uniqueCinValidator(cvService: CvService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }

    return cvService.selectByProperty('cin', control.value).pipe(
      map((cvs) => (cvs.length === 0 ? null : { cinExists: true })),
      catchError(() => of(null))
    );
  };
}
