import { authenticatedPatch } from './apiService';

const UserService = {
    updateUser: (data) => {
        return authenticatedPatch('/rest-auth/user/', data);
    }
}

export default UserService;