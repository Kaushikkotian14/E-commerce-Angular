import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

    export function passwordCheck(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');
        console.log(password?.value,confirmPassword?.value)
        if (password && confirmPassword && password.value !== confirmPassword.value) {  
          confirmPassword.setErrors({ passwordsMismatch: true })
          
        }
          return null;
        
        
      };
    }
