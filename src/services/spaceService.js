import {authenticatedGet} from './apiService';

const SpaceService = {
    getSpaces: () => {
        return authenticatedGet('/api/spaces/');
    }
}

export default SpaceService;