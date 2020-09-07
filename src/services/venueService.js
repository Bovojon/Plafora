import {authenticatedGet} from './apiService';

const VenueService = {
    getVenues: () => {
        return authenticatedGet('/api/venues');
    }
}

export default VenueService;
