import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);


      if(checkControl!=null &&  checkControl.errors && !checkControl.errors.matching) {
        return null;
      }
      if (checkControl!=null && control!= null && control.value !== checkControl.value) {
        //controls.get(checkControlName).setErrors({ matching: true });
        controls.get(checkControlName)?.setErrors({matching : true});
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}