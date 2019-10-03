export const validate = (str, type) => {
  switch (type) {
    case 'password': {
      /* LIVE VERSION STRONGER
      validRegex = /((?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[!@#\$%\^&]+))(?=.{8,})/;
      */
      let validRegex = /^([a-z]{8,31})$/;
      return validRegex.test(str);
    }
    case 'email': {
      // eslint-disable-next-line
      let validRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      str = str.toLowerCase()
      return validRegex.test(str);
    }
    case 'zipcode': {
      let validRegex = /^([0-9]{5})$/;
      return validRegex.test(str);
    }
    case 'name': {
      let validRegex = /^([a-zA-Z]{1,31})$/;
      return validRegex.test(str);
    }
    case 'username': {
      let validRegex = /^([a-zA-Z]?[0-9]?){2,23}$/;
      return validRegex.test(str);
    }
    case 'general': {
      let validRegex = /^(.{1,200})$/;
      return validRegex.test(str);
    }
    default:
      return false;
  }
}
