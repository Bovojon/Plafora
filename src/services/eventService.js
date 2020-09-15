import {authenticatedPost} from './apiService';

const EventService = {
    submitEvent: (data) => {
        return authenticatedPost('/api/events/', data);
    }
}

export default EventService;