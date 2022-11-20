import { EmialValidator } from '../protoccols/email-validator';

export class EmailValidatorAdapter implements EmialValidator {
  isValid(email: string): boolean {
    return false;
  }
}
