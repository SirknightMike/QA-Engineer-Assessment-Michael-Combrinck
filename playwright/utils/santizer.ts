export function isValidSouthAfricanPhoneNumber(phoneNumber: string) {
    const regex = /^\+27\s[0-9]{2}\s[0-9]{3}\s[0-9]{4}$/;
    return regex.test(phoneNumber);
  }