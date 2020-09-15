import {authenticatedGet} from './apiService';

const ImportanceService = {
    getImportance: () => {
        return authenticatedGet('/api/importance/')
    }
}

export default ImportanceService;