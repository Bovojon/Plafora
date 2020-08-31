import {unauthenticatedPost, authenticatedPatch, authenticatedPost, unauthenticatedPut, authenticatedDelete} from './apiService';

const AuthService = {
    login: ({email, password}) => {
        return unauthenticatedPost('/login/', {email, password});
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
}

export default AuthService;