const clearAuth = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('is_authenticated');
    localStorage.removeItem('token_expire');
}

export default clearAuth;