const checkAuth = () => {
    const token = localStorage.getItem('access_token');
    const is_authenticated = localStorage.getItem('is_authenticated');
    const token_expires = localStorage.getItem('token_expire');
    let expire = new Date(token_expires)
    let now = Date.now()

    return !(!token || !is_authenticated || now > expire)
}

export default checkAuth