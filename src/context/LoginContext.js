import React from 'react';
import checkAuth from '../helper/checkAuth';
const LoginContext = React.createContext(checkAuth())

export const LoginProvider = LoginContext.Provider

export default LoginProvider