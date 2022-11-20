import { EmialValidator } from '../protoccols/email-validator';
import validator from 'validator';

export class EmailValidatorAdapter implements EmialValidator {
  isValid(email: string): boolean {
    const isEmaiL = validator.isEmail(email);
    return isEmaiL;
  }
}
