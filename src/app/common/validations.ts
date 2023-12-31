import { Validators } from '@angular/forms';

export const OptionalTextValidation = [Validators.minLength(2), Validators.maxLength(50)];
export const RequiredTextValidation = OptionalTextValidation.concat([
  Validators.required,
]);
export const OneCharValidation = [Validators.minLength(1), Validators.maxLength(1)];
export const EmailValidation = [Validators.required, Validators.email];
export const PasswordValidation = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(50),
];

export const BirthDateValidation = [
  Validators.required,
  Validators.min(new Date().getFullYear() - 100),
  Validators.max(new Date().getFullYear()),
];

export const AUPostCodeValidation = [
  Validators.required,
  Validators.pattern(/^\d{5}(?:[-\s]\d{4})?$/),
];
export const AUPhoneNumberValidation = [
  Validators.required,
  Validators.pattern(/^\D?(\d{2})\D?\D?(\d{4})\D?(\d{4})$/),
];
