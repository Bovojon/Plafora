import { authenticatedGet, authenticatedPatch } from './apiService';

const UserService = {
    getUser: () => {
        return authenticatedGet('/user/');
    },
    updateUser: (data) => {
        return authenticatedPatch('/user/', data);
    }
}

export default UserService;