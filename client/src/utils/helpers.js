// helper function to check if email input is valid email address format
export function validateEmail(email) {
    var re = /^([a-z0-9_.-]+)@([da-z.-]+)\.([a-z.]{2,6})$/;
    return re.test(String(email).toLowerCase());
  }