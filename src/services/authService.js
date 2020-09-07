import {unauthenticatedPost, unauthenticatedPut, authenticatedDelete} from './apiService';

const AuthService = {
    login: ({email, password}) => {
        return unauthenticatedPost('/rest-auth/login/', {email, password});
    },
    logout: () => {
        return authenticatedDelete('/sessions');
    },
    forgotPassword: (username, email) => {
        return unauthenticatedPost('/passwords/forgot', {username, email});
    },
    resetPassword: (password, password_confirmation, reset_password_token) => {
        return unauthenticatedPut('/passwords/reset', {password, password_confirmation, reset_password_token})
    },
    register: ({email, password1, password2}) => {
        return unauthenticatedPost('/rest-auth/registration/', {email, password1, password2});
    }
}

export default AuthService;