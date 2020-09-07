import {authenticatedPost} from './apiService';

const EventService = {
    submitEvent: (date) => {
        return authenticatedPost('/api/events/', data);
    }
}

export default EventService;