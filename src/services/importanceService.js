import {authenticatedGet} from './apiServicer';

const ImportanceService = {
    getImportance: () => {
        return authenticatedGet('/api/importance/')
    }
}

export default ImportanceService;