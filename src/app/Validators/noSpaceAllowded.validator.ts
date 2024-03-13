import { FormControl } from '@angular/forms';

// 1) First Way (We made it as a function)----------------------------------

// export const noSpaceAllowed = (control: FormControl) => {
//   if (control.value != null && control.value.indexOf(' ') != -1) {
//     //Returning the error code
//     return { noSpaceAllowed: true };
//   }
//   //else We are returning the empty error code
//   return null;
// };

// 2) Second Way (We made it as a method inside a class)----------------------------------

export class CustomValidators {
  static noSpaceAllowded(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      //Returning the error code
      return { noSpaceAllowed: true };
    }
    //else We are returning the empty error code
    return null;
  }
  //async validator must return an obserable or promise
  static checkingUserName(control: FormControl): Promise<any> {
    return userNameAllowded(control.value);
  }
}

// We are assuming that this function is an Api which we are making a call from angular

function userNameAllowded(Username: string) {
  const takenUserNames = ['arj00790@gmail.com', 'musa@gmail.com'];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (takenUserNames.includes(Username)) {
        resolve({ checkUsername: true });
      } else {
        resolve(null);
      }
    }, 5000);
  });
}
