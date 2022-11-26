import { EmailValidator } from '../protoccols/email-validator';
import validator from 'validator';

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    const isEmaiL = validator.isEmail(email);
    return isEmaiL;
  }
}
