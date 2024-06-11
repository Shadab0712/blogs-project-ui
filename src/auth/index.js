

export function doLogin(data, next) {
    localStorage.setItem('data', JSON.stringify(data));
    next()
}

export function isLoggedIn() {
    let data = localStorage.getItem('data');
    if (data != null) return true;
    else return false;
}

export function doLogout(next) {
    localStorage.removeItem('data');
    next()
}

export function getCurrentUserDetails() {
    if (isLoggedIn) {
       return JSON.parse(localStorage.getItem('data'))?.user;
    }
    else return undefined;
}
