// import decode from JWT to decode user's information from token
import decode from 'jwt-decode';

// create class to authenticate user each time user logs in
class Auth {
  // get user data from JWT by decoding it using the decode tool
  getUser() {
    return decode(this.getToken());
  }

  // if token exists return 'true' if not return 'false'
  // this does not check if the token is expired
  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  // checking if the token is expired
  isTokenExpired(token) {
    // use decode method to decode the web token
    const decoded = decode(token);

    // check if the token is less than the current time...
    if (decoded.exp < Date.now() / 1000) {
      //  ...if so, remove from local storage
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  // gets the token from user's local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // log user in
  login(idToken) {
    // save token to localStorage
    localStorage.setItem('id_token', idToken);
    // reloads page and sends user to profile page
    window.location.assign('/profile');
  }

  // log user out
  logout() {
    // clear user's token and profile data from local storage
    localStorage.removeItem('id_token');
    // reloads the page and resets the state of the app
    window.location.reload();
  }
}

export default new Auth();
